import { celebrate, Segments, Joi } from 'celebrate';

export default {
  updateAvatar: celebrate({
    [Segments.PARAMS]: {
      establishment_id: Joi.string().uuid().required(),
    },
  }),
};
