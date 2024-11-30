import Joi from "joi";

export const create = {
  body: Joi.object().keys({
    user_id: Joi.string().uuid(),
    answer: Joi.string(),
    assigned_question_id: Joi.string().uuid(),
  }),
};

export const list = {
  body: Joi.object().keys({
    filter: Joi.object()
      .keys({
        is_active: Joi.boolean(),
        user_id: Joi.string().uuid(),
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
    answer_id: Joi.string().required(),
  }),
};

export const update = {
  params: Joi.object().keys({
    answer_id: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      user_id: Joi.string().uuid(),
      answer: Joi.string(),
      assigned_question_id: Joi.string().uuid(),
    })
    .min(1),
};

export const deleteData = {
  params: Joi.object().keys({
    answer_id: Joi.string().required(),
  }),
};

export const paginate = {
  body: Joi.object().keys({
    filter: Joi.object()
      .keys({
        is_active: Joi.boolean(),
        user_id: Joi.string().uuid(),
      })
      .required(),
    select: Joi.object(),
    options: Joi.object().keys({
      sortBy: Joi.string(),
      limit: Joi.number().integer(),
      page: Joi.number().integer(),
    }),
    include: Joi.object(),
    keyword:Joi.string()
  }),
};
