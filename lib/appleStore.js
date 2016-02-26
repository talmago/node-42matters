'use strict';

const _ = require('lodash');
const ClientV1 = require('./client');
const constants = require('./constants');


class AppleStoreAPI extends ClientV1 {

    static get endpoints() {
        return constants.AppleStoreAPI.endpoints;
    }

    static get countries() {
        return constants.AppleStoreAPI.countries;
    }

    static get languages() {
        return constants.AppleStoreAPI.languages;
    }

    lookup(id, lang, fields, callback) {
        var options = {
            id: id
        };
        if (lang) {
            options['lang'] = lang;
        }
        if (fields) {
            options['fields'] = fields.join(",");
        }
        return this.req(
            AppleStoreAPI.endpoints.lookup,
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
        return this.req(AppleStoreAPI.endpoints.search, options, null, callback);
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
            AppleStoreAPI.endpoints.query,
            options, query, callback
        );
    }
}

module.exports = AppleStoreAPI;
