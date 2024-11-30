import Joi from "joi";

export const create = {
  body: Joi.object().keys({
    category_name: Joi.string().required(),
  }),
};

export const list = {
  body: Joi.object().keys({
    filter: Joi.object()
      .keys({
        is_active: Joi.boolean(),
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
    category_id: Joi.string().required(),
  }),
};

export const update = {
  params: Joi.object().keys({
    category_id: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      category_name: Joi.string(),
    })
    .min(1),
};

export const deleteData = {
  params: Joi.object().keys({
    category_id: Joi.string().required(),
  }),
};

export const paginate = {
  body: Joi.object().keys({
    filter: Joi.object()
      .keys({
        is_active: Joi.boolean(),
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
