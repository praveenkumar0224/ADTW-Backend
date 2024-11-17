import { service } from "../lib/services/service.js";

const customServices = {};
const CRUDServices = service<"categories">("categories");

export const categoryService = { ...customServices, ...CRUDServices };
