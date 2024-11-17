import { surveyService } from "../services/survey.service.js";
import { controller } from "../lib/controller/controller.js";

const CRUDController = controller(surveyService);
const customController = {};

export const surveyController = { ...CRUDController, ...customController };
