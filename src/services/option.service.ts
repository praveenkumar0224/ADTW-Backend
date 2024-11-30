import { service } from "../lib/services/service.js";

const customServices = {};
const CRUDServices = service<"option">("option");

export const optionService = { ...customServices, ...CRUDServices };
