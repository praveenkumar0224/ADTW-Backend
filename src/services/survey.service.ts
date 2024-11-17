import { service } from "../lib/services/service.js";

const customServices = {};
const CRUDServices = service<"survey">("survey");

export const surveyService = { ...customServices, ...CRUDServices };
