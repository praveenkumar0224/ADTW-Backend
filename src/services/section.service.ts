import { service } from "../lib/services/service.js";

const customServices = {};
const CRUDServices = service<"section">("section");

export const sectionService = { ...customServices, ...CRUDServices };
