import Joi from "joi";


export const create = {
  body: Joi.object().keys({
    email_address: Joi.string().email(),
    name: Joi.string().required(),
    mobile_number: Joi.string().required(),
    designation: Joi.string(),
    target_freq_per_month: Joi.string(),
    roles: Joi.string().required(),
  }),
};

export const list = {
  body: Joi.object().keys({
    filter: Joi.object()
      .keys({
        is_active: Joi.boolean(),
      })
      .required(),
    select: Joi.object().keys({
      first_name: Joi.boolean(),
      mobile_number: Joi.boolean(),
      roles: Joi.boolean(),
      is_active: Joi.boolean(),
      user_id: Joi.boolean(),
    }),
    options: Joi.object().keys({
      sortBy: Joi.string(),
      limit: Joi.number().integer(),
      page: Joi.number().integer(),
    }),
    include: Joi.object().keys({
      user: Joi.boolean(),
    }),
  }),
};

export const get = {
  params: Joi.object().keys({
    user_id: Joi.string().required(),
  }),
};

export const update = {
  params: Joi.object().keys({
    user_id: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      mobile_number: Joi.string(),
      email_address: Joi.string().email(),
      name: Joi.string(),
      designation: Joi.string(),
      target_freq_per_month: Joi.string(),
      roles: Joi.string().required(),
    })
    .min(1),
};

export const deleteData = {
  params: Joi.object().keys({
    user_id: Joi.string().required(),
  }),
};

export const paginate = {
  body: Joi.object().keys({
    filter: Joi.object()
      .keys({
        is_active: Joi.boolean(),
        name:Joi.object(),
      })
      .required(),
    select: Joi.object().keys({
      first_name: Joi.boolean(),
      email_address: Joi.boolean(),
      mobile_number: Joi.boolean(),
      roles: Joi.boolean(),
      is_active: Joi.boolean(),
      user_id: Joi.boolean(),
    }),
    options: Joi.object().keys({
      sortBy: Joi.string(),
      limit: Joi.number().integer().required(),
      page: Joi.number().integer().required(),
    }),
    include: Joi.object().keys({
      user: Joi.boolean(),
    }),
  }),
};

export const searchUser = {
  query: Joi.object().keys({
    keyword: Joi.string().required().min(3),
  }),
};
