import { assignedQuestionService } from "../services/assigned_question.service.js";
import { controller } from "../lib/controller/controller.js";

const CRUDController = controller(assignedQuestionService);
const customController = {};

export const assignedQuestionController = { ...CRUDController, ...customController };
