import { questionService } from "../services/question.service.js";
import { controller } from "../lib/controller/controller.js";
import catchAsync from "../utils/catchAsync.js";
import responseHandler from "../utils/response.js";

const CRUDController = controller(questionService);
const customController = {
  serachQuestion: catchAsync(async (req, res) => {
    const data = await questionService.searchQuestion(
      req.query.keyword as string
    );
    responseHandler(res, data);
  }),
};

export const questionController = { ...CRUDController, ...customController };
