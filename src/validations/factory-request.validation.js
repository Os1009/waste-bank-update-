const Joi = require('joi');

exports.createFactoryRequestSchema =
  Joi.object({

    category: Joi.string()
      .required(),

    quantity: Joi.number()
      .required(),

    quantity_gauge: Joi.string()
      .required(),

    max_price: Joi.number()
      .required(),

  });


  exports.updateFactoryRequestSchema =
  Joi.object({

    category: Joi.string(),

    quantity: Joi.number(),

    quantity_gauge: Joi.string(),

    max_price: Joi.number(),

  });