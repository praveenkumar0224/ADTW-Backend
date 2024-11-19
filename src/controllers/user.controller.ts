import { userService } from "../services/user.service.js";
import { controller } from "../lib/controller/controller.js";
import catchAsync from "../utils/catchAsync.js";
import responseHandler from "../utils/response.js";

const CRUDController = controller(userService);
const customController = {
  serachUser: catchAsync(async (req, res) => {
    const data = await userService.searchUser(req.query.keyword as string);
    responseHandler(res, data);
  }),
  Createv2: catchAsync(async (req, res) => {
    const data = await userService.createV2(req.body)
    responseHandler(res, data);
  }),
};

export const userController = { ...CRUDController, ...customController };
