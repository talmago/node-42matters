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
            useCache: true
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


class GoogleAPI extends ClientV1 {

    /*ensure(options) {
     if (options['list_item']) {
     }
     if (options['cat_key']) {
     }
     if (options['country']) {
     }
     if (options['lang']) {
     }
     if (options['limit']) {
     }
     if (options['page']) {
     }
     if (options['date']) {
     }
     if (options['fields']) {
     }
     }*/

    lookup(pname, lang, fields, callback) {
        var options = {
            p: pname
        };
        if (lang) {
            options['lang'] = lang;
        }
        if (fields) {
            options['fields'] = fields.join(",");
        }
        return this.req('apps/lookup.json', options, null, callback);
    }

    search(query, include_desc, lang, fields, callback) {
        var options = {
            q: query
        };
        if (include_desc) {
            options['include_desc'] = include_desc.toString();
        }
        if (lang) {
            options['lang'] = lang;
        }
        if (fields) {
            options['fields'] = fields.join(",");
        }
        return this.req('apps/search.json', options, null, callback);
    }

    query(query, lang, limit, page, fields, callback) {
        var options = Object.create(null);
        if (lang) {
            options['lang'] = lang;
        }
        if (limit) {
            options['limit'] = limit.toString();
        }
        if (page) {
            options['page'] = page.toString();
        }
        if (fields) {
            options['fields'] = fields.join(",");
        }
        return this.req('apps/query.json', options, query, callback);
    }

    available(pname, countries, callback) {
        var options = {
            p: pname
        };
        if (countries) {
            options['country'] = countries.join(",");
        }
        return this.req('apps/availability.json', options, null)
            .then(function(res) {
                var available = {};
                res = _.first(_.get(res, 'results'));
                if (res) {
                    _.forEach(res.available_in, function(cc) {
                        available[cc] = true;
                    });
                    _.forEach(res.not_available_in, function(cc) {
                        available[cc] = false;
                    });
                    _.forEach(res.availability_unknown, function(cc) {
                        available[cc] = 'N/A';
                    });
                }
                return callback ?
                    callback(null, available) :
                    available;
            })
            .catch(function(e) {
                if (callback) {
                    callback(e);
                } else {
                    throw e;
                }
            });
    }

    getTopGoogleChart(chart, category, country, lang, limit, page, date, fields, callback) {
        var options = Object.create(null);
        if (chart) {
            options['list_item'] = chart;
        }
        if (category) {
            options['cat_key'] = category;
        }
        if (country) {
            options['country'] = country;
        }
        if (lang) {
            options['lang'] = lang;
        }
        if (limit) {
            options['limit'] = limit.toString();
        }
        if (page) {
            options['page'] = page.toString();
        }
        if (date) {
            options['date'] = moment(now).format('DD-MM-YYYY');
        }
        if (fields) {
            options['fields'] = fields.join(",");
        }
        return this.req('apps/top_google_charts.json', options, null, callback);
    }
}

module.exports = {
    GoogleAPI: GoogleAPI
};