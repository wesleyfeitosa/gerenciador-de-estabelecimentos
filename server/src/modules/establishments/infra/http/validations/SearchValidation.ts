import { celebrate, Segments, Joi } from 'celebrate';

export default {
  search: celebrate({
    [Segments.QUERY]: {
      city: Joi.string().required(),
      state: Joi.string().required(),
    },
  }),
};
