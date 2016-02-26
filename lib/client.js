'use strict';

const _ = require('lodash');
const Promise = require('bluebird');
const url = require('url');
const util = require('util');
const request = require('request');
const constants = require('./constants');


class ClientV1 {

    constructor(options) {

        if (!_.isString(options) && !_.isObject(options)) {
            throw new Error("constructor expects first argument to be a string or an object.");
        }

        if (_.isObject(options) && !options.hasOwnProperty('accessToken')) {
            throw new Error("options object must have an 'accessToken' property.");
        }

        if (_.isString(options)) {
            options = {
                accessToken: options
            }
        }

        this.config = _.assign(_.defaults(options, {
            debug: false,
            useCache: false
        }, constants.V1));

        if (this.config.useCache) {
            this.cache = require('memory-cache');
        }
    }

    req(endpoint, qs, payload, callback) {
        var res;
        var self = this;
        var requestObject = {
            method: _.isObject(payload) ? "POST" : "GET",
            uri: url.format({
                host: self.config.hostname,
                protocol: self.config.protocol,
                pathname: self.config.pathname + "/" + self.config.version + "/" + endpoint,
                query: _.assign({}, qs, {
                    'access_token': self.config.accessToken
                })
            })
        };
        if (payload) {
            requestObject.body = JSON.stringify(payload);
            requestObject.headers = {
                "Content-Type": "application/json"
            };
        }
        var promise = new Promise(function (resolve, reject) {
            if (self.config.useCache && requestObject.method == "GET") {
                res = self.cache.get(requestObject.uri);
                self.config.debug && console.log(util.format("cache.get(%s) = %s"), requestObject.uri, res ? "hit" : "miss");
                if (res) return resolve(res);
            }
            request(requestObject, function (err, response, body) {
                if (self.config.debug) {
                    console.log(requestObject.method, requestObject.uri, _.get(response, 'statusCode'));
                    if (requestObject.method == "POST") {
                        console.log(requestObject.body);
                    }
                }
                if (err) reject(err);
                else if (response.statusCode == 200) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {
                        reject(e);
                    }
                    if (self.config.useCache && requestObject.method == "GET") {
                        self.config.debug && console.log(util.format("cache.put(%s)", requestObject.uri));
                        self.cache.put(requestObject.uri, body);
                    }
                    resolve(body);
                } else {
                    resolve();
                }
            });
        });
        if (!callback) return promise;
        promise.then(function (id) {
            callback(null, id);
        }).catch(function (err) {
            callback(err);
        });
    };
}

module.exports = ClientV1;