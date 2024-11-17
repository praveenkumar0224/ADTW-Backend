import Joi from "joi";
import * as assignedQuestion from "./assignedQuestion.validation.js";

export const create = {
  body: Joi.object().keys({
    section_title: Joi.string(),
    section_desc: Joi.string(),
    survey_id: Joi.string().uuid(),
    assigned_question: Joi.object().keys({
      create: Joi.array().items(assignedQuestion.create.body),
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
    section_id: Joi.string().required(),
  }),
};

export const update = {
  params: Joi.object().keys({
    section_id: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      section_title: Joi.string(),
      section_desc: Joi.string(),
      survey_id: Joi.string().uuid(),
    })
    .min(1),
};

export const deleteData = {
  params: Joi.object().keys({
    section_id: Joi.string().required(),
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
  }),
};
