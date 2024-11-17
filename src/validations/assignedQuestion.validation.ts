import Joi from "joi";

export const create = {
  body: Joi.object().keys({
    section_id: Joi.string().uuid(),
    question_id: Joi.string().uuid().required(),
    is_mandatory: Joi.boolean(),
    condition_to_display: Joi.object().keys({
      operation: Joi.string().valid("and", "or"),
      conditions: Joi.array().items(
        Joi.object().keys({
          question_id: Joi.string().uuid().required(),
          options: Joi.array().items(Joi.string()),
        })
      ),
    }),
  }),
};

export const list = {
  body: Joi.object().keys({
    filter: Joi.object()
      .keys({
        is_active: Joi.boolean(),
        section_id: Joi.string().uuid(),
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
    assigned_question_id: Joi.string().required(),
  }),
};

export const update = {
  params: Joi.object().keys({
    assigned_question_id: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      section_id: Joi.string().uuid(),
      question_id: Joi.string().uuid(),
      is_mandatory: Joi.boolean(),
      condition_to_display: Joi.object().keys({
        operation: Joi.string().valid("and", "or"),
        conditions: Joi.array().items(
          Joi.object().keys({
            question_id: Joi.string().uuid().required(),
            options: Joi.array().items(Joi.string()),
          })
        ),
      }),
    })
    .min(1),
};

export const deleteData = {
  params: Joi.object().keys({
    assigned_question_id: Joi.string().required(),
  }),
};

export const paginate = {
  body: Joi.object().keys({
    filter: Joi.object()
      .keys({
        is_active: Joi.boolean(),
        section_id: Joi.string().uuid(),
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
