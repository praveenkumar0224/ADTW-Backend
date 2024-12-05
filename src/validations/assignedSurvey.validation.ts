import Joi from "joi";

export const create = {
  body: Joi.object().keys({
    survey_id: Joi.string().uuid().required(),
    user_id: Joi.string().uuid().required(),
    hostel_id: Joi.string().uuid().required(),
  }),
};

export const createMany = {
  body: Joi.array().items(
    Joi.object().keys({
      survey_id: Joi.string().uuid().required(),
      user_id: Joi.string().uuid().required(),
      hostel_id: Joi.string().uuid().required(),
    })
  ),
};

export const list = {
  body: Joi.object().keys({
    filter: Joi.object()
      .keys({
        is_active: Joi.boolean(),
        survey_id: Joi.string().uuid(),
        user_id: Joi.string().uuid(),
        hostel_id: Joi.string().uuid(),
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
    assigned_survey_id: Joi.string().required(),
  }),
};

export const update = {
  params: Joi.object().keys({
    assigned_survey_id: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      survey_id: Joi.string().uuid().required(),
      user_id: Joi.string().uuid(),
      hostel_id: Joi.string().uuid(),
    })
    .min(1),
};

export const deleteData = {
  params: Joi.object().keys({
    assigned_survey_id: Joi.string().required(),
  }),
};

export const paginate = {
  body: Joi.object().keys({
    filter: Joi.object()
      .keys({
        is_active: Joi.boolean(),
        survey_id: Joi.string().uuid(),
        user_id: Joi.string().uuid(),
        hostel_id: Joi.string().uuid(),
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
