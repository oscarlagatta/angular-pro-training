'use strict';

const Joi = require('joi');

// we have a name parameter we used 
// in the routes/get_user.js 
const paramsValidator = Joi.object({
    // it will be always a strig anyway
    // but for the sake of demo
    // but we want we can use a Regex, saying that
    // the parameter needs to be 'firstname.lastname'
    userName: Joi
                .string()
                .required()
                .description('User Name')
                .example('john.doe')
});

module.exports = { 
    paramsValidator 
};