import Joi from "joi";

export const create = {
  body: Joi.object().keys({
    district_name: Joi.string(),
    hostel_name_tamil: Joi.string(),
    hostel_name_english: Joi.string().required(),
    hostel_address_tamil: Joi.string(),
    hostel_address_english: Joi.string().required(),
    warden_name: Joi.string().required(),
    mobile_number: Joi.string().required(),
  }),
};

export const list = {
  body: Joi.object().keys({
    filter: Joi.object()
      .keys({
        is_active: Joi.boolean(),
        district_name: Joi.string(),
        warden_name: Joi.string(),
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
    hostel_id: Joi.string().required(),
  }),
};

export const update = {
  params: Joi.object().keys({
    hostel_id: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      district_name: Joi.string(),
      hostel_name_tamil: Joi.string(),
      hostel_name_english: Joi.string(),
      hostel_address_tamil: Joi.string(),
      hostel_address_english: Joi.string(),
      warden_name: Joi.string(),
      mobile_number: Joi.string(),
    })
    .min(1),
};

export const deleteData = {
  params: Joi.object().keys({
    hostel_id: Joi.string().required(),
  }),
};

export const paginate = {
  body: Joi.object().keys({
    filter: Joi.object()
      .keys({
        is_active: Joi.boolean(),
        district_name: Joi.string(),
        warden_name: Joi.string(),
        hostel_name_english: Joi.object(),
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


export const searchHostel = {
  query: Joi.object().keys({
    keyword: Joi.string().required().min(3),
  }),
};