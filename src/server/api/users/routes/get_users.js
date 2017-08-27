'use strict';

const Boom = require("boom");
const Joi = require("joi");

const usersData = require('../../../data/users');
const sortBy = require('lodash').sortBy;

const queryValidator = require('./../validation/get_users').queryValidator;

module.exports = {
    method: 'GET',
    path: '/api/v1/users',
    config: {
        validate: {
            query: queryValidator
        },
        tags: ['api'], // ADD THIS TAG FOR SWAGGER
        handler: (request, reply) => {
            if (!usersData.length){
                return reply(Boom.notFound('No users found'));
            }

            // specify the data I want
            const usersReducedData = usersData.map(
                user => {
                    return {
                        id: user.id,
                        name: user.name,
                        userName: user.userName
                    }
                }
            )

            const sortDirection = request.query.sortDirection;
            const sortKey = request.query.sortKey;

            const sortData = (data, direction, key) => {
                if (direction === 'asc')
                {
                    return sortBy(data, key);   
                } else if (direction === 'desc')
                {
                    return sortBy(data, key).reverse();   
                } else {
                    return data;
                }
            }
            
            reply(sortData(usersReducedData, sortDirection, sortKey));
        }, // handler
        description: 'This endpoint will get all the users'
    }
}