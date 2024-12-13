import Joi from "joi";
import * as section from "./section.validation.js";
export const create = {
  body: Joi.object().keys({
    survey_name: Joi.string().required(),
    survey_type: Joi.string(),
    section: Joi.object().keys({
      create: Joi.array().items(section.create.body),
    }),
  }),
};

export const list = {
  body: Joi.object().keys({
    filter: Joi.object()
      .keys({
        is_active: Joi.boolean(),
        survey_id: Joi.string().uuid(),
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
    survey_id: Joi.string().required(),
  }),
};

export const update = {
  params: Joi.object().keys({
    survey_id: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      survey_name: Joi.string().required(),
      survey_type: Joi.string(),
    })
    .min(1),
};

export const deleteData = {
  params: Joi.object().keys({
    survey_id: Joi.string().required(),
  }),
};

export const paginate = {
  body: Joi.object().keys({
    filter: Joi.object()
      .keys({
        is_active: Joi.boolean(),
        survey_id: Joi.string().uuid(),
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

export const getAnswers = {
  query: Joi.object().keys({
    survey_id: Joi.string().required().uuid(),
  }),
};
