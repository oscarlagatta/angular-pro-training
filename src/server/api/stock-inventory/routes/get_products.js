'use strict';

const Boom = require("boom");
const Joi = require("joi");

const productsData = require('../../../data/products');
const sortBy = require('lodash').sortBy;

module.exports = {
    method: 'GET',
    path: '/api/v1/products',
    config: {
        tags: ['api'], // ADD THIS TAG FOR SWAGGER
        handler: (request, reply) => {
            if (!productsData[0].products.length){
                return reply(Boom.notFound('No users found'));
            }
            reply(productsData[0].products);

        }, // handler
        description: 'This endpoint will get all the stock data'
    }
}