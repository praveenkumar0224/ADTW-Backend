import Joi from "joi";

export const create = {
  body: Joi.object().keys({
    option_text: Joi.string().required(),
    question_id: Joi.string().uuid().required(),
  }),
};

export const list = {
  body: Joi.object().keys({
    filter: Joi.object()
      .keys({
        is_active: Joi.boolean(),
        question_id: Joi.string().uuid(),
      })
      .required(),
    select: Joi.object(),
    options: Joi.object().keys({
      sortBy: Joi.string(),
      limit: Joi.number().integer(),
      page: Joi.number().integer(),
    }),
    include: Joi.object(),
  }),
};

export const get = {
  params: Joi.object().keys({
    option_id: Joi.string().required(),
  }),
};

export const update = {
  params: Joi.object().keys({
    option_id: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      option_text: Joi.string(),
      question_id: Joi.string().uuid(),
    })
    .min(1),
};

export const deleteData = {
  params: Joi.object().keys({
    option_id: Joi.string().required(),
  }),
};

export const paginate = {
  body: Joi.object().keys({
    filter: Joi.object()
      .keys({
        is_active: Joi.boolean(),
        question_id: Joi.string().uuid(),
      })
      .required(),
    select: Joi.object(),
    options: Joi.object().keys({
      sortBy: Joi.string(),
      limit: Joi.number().integer(),
      page: Joi.number().integer(),
    }),
    include: Joi.object(),
    keyword: Joi.string(),
  }),
};

export const searchHostel = {
  query: Joi.object().keys({
    keyword: Joi.string().required().min(3),
  }),
};
