import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';
import responseHandler from '../../utils/response.js';
import { Service } from '../../types/lib/service.js';

import { ModelName } from '../../types/lib/service.js';

export const controller = <M extends ModelName>(service: Service<M>) => ({
  create: catchAsync(async (req, res) => {
    const data = await service.create(req.body);
    responseHandler(res, data, httpStatus.CREATED);
  }),
  get: catchAsync(async (req, res) => {
    const data = await service.get(req.params);
    responseHandler(res, data);
  }),
  list: catchAsync(async (req, res) => {
    const { filter, options = {}, include = {}, select = {} } = req.body;
    const data = await service.list(filter, options, include, select);
    responseHandler(res, data);
  }),
  update: catchAsync(async (req, res) => {
    const data = await service.update(req.params, req.body);
    responseHandler(res, data);
  }),
  delete: catchAsync(async (req, res) => {
    console.log(res);
    
    const data = await service.delete(req.params);
    responseHandler(res, data);
  }),
  paginate: catchAsync(async (req, res) => {
    const { filter, options = {}, include = {}, select = {} } = req.body;
    const count = await service.count(filter, options);
    const data = await service.list(filter, options, include, select);
    const total_page = Math.ceil(count / options?.limit);
    const response = {
      page: options?.page,
      per_page: options?.limit,
      total_pages: total_page,
      total_count: count,
      result: data
    };
    responseHandler(res, response);
  })
});
