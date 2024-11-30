import { optionService } from "../services/option.service.js";
import { controller } from "../lib/controller/controller.js";

const CRUDController = controller(optionService);
const customController = {};

export const optionController = { ...CRUDController, ...customController };
