import Joi from "joi";

export const create = {
  body: Joi.object().keys({
    question_category: Joi.object().keys({
      category_name: Joi.string().required(),
    }),
    performance_score: Joi.number().required(),
    question: Joi.string().required(),
    question_desc: Joi.string(),
    input_type: Joi.string().required(),
    options: Joi.object().keys({
      createMany: Joi.object().keys({
        data: Joi.array().items(
          Joi.object().keys({
            option_text: Joi.string(),
          })
        ),
      }),
    }),
  }),
};

export const list = {
  body: Joi.object().keys({
    filter: Joi.object()
      .keys({
        is_active: Joi.boolean(),
        question_category: Joi.string(),
        hostel_type: Joi.string(),
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
    question_id: Joi.string().required(),
  }),
};

export const update = {
  params: Joi.object().keys({
    question_id: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      hostel_type: Joi.string(),
      question_category: Joi.string(),
      performance_score: Joi.string(),
      question: Joi.string(),
      question_desc: Joi.string(),
    })
    .min(1),
};

export const deleteData = {
  params: Joi.object().keys({
    question_id: Joi.string().required(),
  }),
};

export const paginate = {
  body: Joi.object().keys({
    filter: Joi.object()
      .keys({
        is_active: Joi.boolean(),
        question_category: Joi.string(),
        hostel_type: Joi.string(),
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

export const searchQuestion = {
  query: Joi.object().keys({
    keyword: Joi.string().required().min(3),
  }),
};
