import { surveyService } from "../services/survey.service.js";
import { controller } from "../lib/controller/controller.js";
import catchAsync from "../utils/catchAsync.js";
import responseHandler from "../utils/response.js";

const CRUDController = controller(surveyService);
const customController = {
  getAnswers: catchAsync(async (req, res) => {
    const data = await surveyService.getAnswers(req.query.survey_id as string);
    responseHandler(res, data);
  }),
};

export const surveyController = { ...CRUDController, ...customController };
