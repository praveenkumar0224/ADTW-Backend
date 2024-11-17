import { sectionService } from "../services/section.service.js";
import { controller } from "../lib/controller/controller.js";

const CRUDController = controller(sectionService);
const customController = {};

export const sectionController = { ...CRUDController, ...customController };
