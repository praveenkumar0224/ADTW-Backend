import { service } from "../lib/services/service.js";

const customServices = {};
const CRUDServices = service<"assigned_survey">("assigned_survey");

export const assignedSurveyService = { ...CRUDServices, ...customServices };
