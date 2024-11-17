import { hostelService } from "../services/hostel.service.js";
import { controller } from "../lib/controller/controller.js";
import catchAsync from "../utils/catchAsync.js";
import responseHandler from "../utils/response.js";

const CRUDController = controller(hostelService);
const customController = {
  searchHostel: catchAsync(async (req, res) => {
    const data = await hostelService.searchHostel(req.query.keyword as string);
    responseHandler(res, data);
  }),
};

export const hostelController = { ...CRUDController, ...customController };
