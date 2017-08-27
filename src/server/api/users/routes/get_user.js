'use strict';

const Boom = require('boom');
const usersData = require('../../../data/users');

const paramsValidator = require('./../validation/get_user').paramsValidator;

const query = require('./../queries/users');
module.exports = {
    method: 'GET',
    path: '/api/v1/users/{userName}',
    config: {
        tags: ['api'], // ADD THIS TAG FOR SWAGGER
        validate: {
            params: paramsValidator
        },
        pre: [{ method: query.getGithubImage, assign: 'image' }],
        handler: (request, reply) => {
            let user = usersData.find(
                user => user.userName === request.params.userName
            );
         
            if(!user){
                return reply(Boom.notFound('User not found'));
            }

            user.avatar = request.pre.image;

            reply(user);
        }, // handler
        description: 'This endpoint will get all a specific user'
    } 
       
}