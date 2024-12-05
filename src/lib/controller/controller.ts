import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import responseHandler from "../../utils/response.js";
import { Service } from "../../types/lib/service.js";
import Fuse from "fuse.js";
import { ModelName } from "../../types/lib/service.js";

export const controller = <M extends ModelName>(service: Service<M>) => ({
  create: catchAsync(async (req, res) => {
    const data = await service.create(req.body);
    responseHandler(res, data, httpStatus.CREATED);
  }),
  createMany: catchAsync(async (req, res) => {
    const data = await service.createMany(req.body);
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
    const data = await service.delete(req.params);
    responseHandler(res, data);
  }),
  paginate: catchAsync(async (req, res) => {
    const {
      filter,
      options = {},
      include = {},
      select = {},
      keyword = "",
    } = req.body;
    const data = await service.list(filter, options, include, select);

    // Perform search if keyword is provided
    let filteredData = data;
    if (keyword) {
      const fields = await service.getModelFields();
      const fuse = new Fuse(data, {
        keys: fields,
        threshold: 0.5,
        location: 0,
        distance: 100,
        includeMatches: true,
        includeScore: true,
        useExtendedSearch: true,
      });
      const searchResults = fuse.search(keyword);
      filteredData = searchResults.map((result) => result.item);
    }

    // Pagination
    const page = options.page || 1;
    const limit = options.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Paginate the filtered results
    const paginatedResults = filteredData.slice(startIndex, endIndex);

    // Prepare response
    const response = {
      page: page,
      per_page: limit,
      total_pages: Math.ceil(filteredData.length / limit),
      total_count: filteredData.length,
      result: paginatedResults,
    };
    responseHandler(res, response);
  }),
});
