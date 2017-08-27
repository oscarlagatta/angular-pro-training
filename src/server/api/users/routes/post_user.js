'use strict';

const usersData = require('./../../../data/users');
const query = require('./../queries/users');

const payloadValidator = require('./../validation/post_user').payloadValidator;
module.exports = {
  method: 'POST',
  path: '/api/v1/users',
  config: {
    tags: ['api'], // ADD THIS TAG FOR SWAGGER
    validate: {
            payload: payloadValidator
    },
    pre: [
      { method: query.verifyUniqueUser },
      { method: query.createUserName, assign: 'userName' }
    ],
    handler: (request, reply) => {
      let submittedData = request.payload;
      submittedData.id = usersData.length + 1;
      submittedData.userName = request.pre.userName;
      usersData.push(submittedData);

      // The way we respond depends on what we want
      // to do in the app afterwards
      // reply({ message: 'user added!' });

      console.log('username : ', request.pre.userName);
      reply(usersData.find(item => item.userName == request.pre.userName));
    }, // handler
    description: 'This endpoint will create a new user'
  }
};