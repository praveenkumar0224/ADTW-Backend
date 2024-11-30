import { assignedSurveyService } from "../services/assigned_survey.service.js";
import { controller } from "../lib/controller/controller.js";

const CRUDController = controller(assignedSurveyService);
const customController = {};

export const assignedSurveyController = {
  ...CRUDController,
  ...customController,
};
