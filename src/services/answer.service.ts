import { service } from "../lib/services/service.js";

const customServices = {};
const CRUDServices = service<"answer">("answer");

export const answerService = { ...customServices, ...CRUDServices };
