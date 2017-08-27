'use strict';

const Boom = require('boom');

const branchData = require('../../../data/products');

module.exports = {
    method: 'GET',
    path: '/api/v1/branches/{id}',
    config: {
        tags: ['api'], // ADD THIS TAG FOR SWAGGER
        handler: (request, reply) => {
            let branch = branchData[0].branches.find(
                branch => branch.id === request.params.id
            );
         
            if(!branch){
                return reply(Boom.notFound('Branch not found'));
            }

            reply(branch);
        }, // handler
        description: 'This endpoint will get all a specific branch'
    } 
       
}