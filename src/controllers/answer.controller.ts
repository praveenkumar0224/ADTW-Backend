import { answerService } from "../services/answer.service.js";
import { controller } from "../lib/controller/controller.js";

const CRUDController = controller(answerService);
const customController = {};

export const answerController = { ...CRUDController, ...customController };
