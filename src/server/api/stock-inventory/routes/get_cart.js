'use strict';

const Boom = require("boom");
const Joi = require("joi");

const cartData = require('../../../data/products');
const sortBy = require('lodash').sortBy;

module.exports = {
    method: 'GET',
    path: '/api/v1/cart',
    config: {
        tags: ['api'], // ADD THIS TAG FOR SWAGGER
        handler: (request, reply) => {
            if (!cartData[0].cart.length){
                return reply(Boom.notFound('No cart data found'));
            }
            reply(cartData[0].cart);
        }, // handler
        description: 'This endpoint will get all the cart data'
    }
}