'use strict';

const Joi = require('joi');

// We want 'name' and 'email' to be required
// and for the Twitter handle to have an @ symbol
// and be a max of 15 characters
const payloadValidator = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    twitter: Joi.string().regex(/^(\@)[A-Za-z0-9_]{1,15}$/),
    github: Joi.string(),
    roles: Joi.array().items(Joi.string())
});

module.exports = {
    payloadValidator
};