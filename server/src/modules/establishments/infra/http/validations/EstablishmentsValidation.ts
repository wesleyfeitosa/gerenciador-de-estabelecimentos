import { celebrate, Segments, Joi } from 'celebrate';

export default {
  create: celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      phone: Joi.string().required(),
      type: Joi.string().required(),
      street: Joi.string().required(),
      street_number: Joi.number().required(),
      neighborhood: Joi.string().required(),
      zipcode: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
    },
  }),

  update: celebrate({
    [Segments.BODY]: {
      establishment_id: Joi.string().uuid().required(),
      name: Joi.string().optional(),
      phone: Joi.string().optional(),
      type: Joi.string().optional(),
      street: Joi.string().optional(),
      street_number: Joi.number().optional(),
      neighborhood: Joi.string().optional(),
      zipcode: Joi.string().optional(),
      city: Joi.string().optional(),
      state: Joi.string().optional(),
    },
  }),

  remove: celebrate({
    [Segments.PARAMS]: {
      establishment_id: Joi.string().uuid().required(),
    },
  }),
};
