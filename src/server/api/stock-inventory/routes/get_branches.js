'use strict';

const Boom = require("boom");
const Joi = require("joi");

const branchData = require('../../../data/products');
const sortBy = require('lodash').sortBy;

module.exports = {
    method: 'GET',
    path: '/api/v1/branches',
    config: {
        tags: ['api'], // ADD THIS TAG FOR SWAGGER
        handler: (request, reply) => {
            if (!branchData[0].branches.length){
                return reply(Boom.notFound('No branch data found'));
            }
            reply(branchData[0].branches);
        }, // handler
        description: 'This endpoint will get all the branches data'
    }
}