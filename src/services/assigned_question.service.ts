import { service } from "../lib/services/service.js";

const customServices = {};
const CRUDServices = service<"assigned_question">("assigned_question");

export const assignedQuestionService = { ...customServices, ...CRUDServices };
