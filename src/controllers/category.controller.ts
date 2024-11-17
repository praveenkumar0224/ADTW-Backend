import { categoryService } from "../services/category.service.js";
import { controller } from "../lib/controller/controller.js";

const CRUDController = controller(categoryService);
const customController = {};

export const categoryController = { ...CRUDController, ...customController };
