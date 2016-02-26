'use strict';

const _ = require('lodash');
const ClientV1 = require('./client');
const constants = require('./constants');

class GooglePlayStoreAPI extends ClientV1 {

    static get endpoints() {
        return constants.GooglePlayStoreAPI.endpoints;
    }

    static get languages() {
        return constants.GooglePlayStoreAPI.languages;
    }

    static get countries() {
        return constants.GooglePlayStoreAPI.countries;
    }

    static get categories() {
        return constants.GooglePlayStoreAPI.categories;
    }

    static get charts() {
        return constants.GooglePlayStoreAPI.charts;
    }

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
        return this.req(
            GooglePlayStoreAPI.endpoints.lookup,
            options, null, callback
        );
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
        return this.req(GooglePlayStoreAPI.endpoints.search, options, null, callback);
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
        return this.req(
            GooglePlayStoreAPI.endpoints.query,
            options, query, callback
        );
    }

    available(pname, countries, callback) {
        var options = {
            p: pname
        };
        if (countries) {
            options['country'] = countries.join(",");
        }
        return this.req(GooglePlayStoreAPI.endpoints.availability, options, null)
            .then(function (res) {
                var available = {};
                res = _.first(_.get(res, 'results'));
                if (res) {
                    _.forEach(res.available_in, function (cc) {
                        available[cc] = true;
                    });
                    _.forEach(res.not_available_in, function (cc) {
                        available[cc] = false;
                    });
                    _.forEach(res.availability_unknown, function (cc) {
                        available[cc] = 'N/A';
                    });
                }
                return callback ?
                    callback(null, available) :
                    available;
            })
            .catch(function (e) {
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
        return this.req(
            GooglePlayStoreAPI.endpoints.charts,
            options, null, callback
        );
    }
}