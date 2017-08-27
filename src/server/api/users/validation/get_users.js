'use strict';

const Joi = require('joi');

// We know that the only options for sortDirection
// are 'asc' and 'desc' and for sortKey are 'id',
// 'name', and 'userName
const queryValidator = Joi.object({
  sortDirection: Joi
          .string()
          .valid(['asc', 'desc'])
          .description('Sort Direction')
          .example('asc'),
  sortKey: Joi
          .string()
          .valid(['id', 'name', 'userName'])
          .description('Sort Key')
          .example('userName')
});

module.exports = { queryValidator };