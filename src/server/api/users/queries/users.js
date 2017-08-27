'use strict';

const Boom = require("boom");

// library provided for the hapi ecosystem and is 
// http client;
const Wreck = require('wreck');

const usersData = require('../../../data/users');

// When someone goes to create a new user, we
// should check whether they exist already. This is a good
// use case for route prerequisites 
const verifyUniqueUser = (request, reply) => {

  const name = request.payload.name;
  const existingUser = usersData.find(
    user => user.name === name
  );
  if (existingUser) {
    return reply(Boom.badRequest('user already exists!'));
  }
  return reply();
};

// We need to create a userName for the user.
// This could be done in the handler, but
// why not let it be done in the route
// prereq instead
const createUserName = (request, reply) => {
  const name = request.payload.name;
  const userName = name.split(' ').join('-');
  reply(userName.toLowerCase());
};

// Route prerequisites support both sync and async
// operations. The reply interface in the handler
// won't be called until this request is fulfilled

const getGithubImage = (request, reply) => {
  const userName = request.params.userName;

  const currentUser = usersData.find( user=> user.userName == userName);
  if (!currentUser)
    return reply(Boom.badRequest("User doesn\'t exist!"));

  const githubUser = usersData.find(
    user => user.userName == userName
  ).github;

  if (!githubUser) return reply();
  
  const options = {
    headers: { 'User-Agent': 'ev-users-api' },
    json: true
  };

  Wreck.get(
    `https://api.github.com/users/${githubUser}`,
    options,
    (error, response, payload) => {
       if (error) {
          return reply(Boom.badRequest('Error getting github image'))
       }
       return reply(payload.avatar_url);
    }
  );
};

module.exports = {
    verifyUniqueUser,
    createUserName,
    getGithubImage
}