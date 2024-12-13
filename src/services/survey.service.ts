import prisma from "../client.js";
import { service } from "../lib/services/service.js";
import RawQuery from "../lib/Query/rawquery.js";

const customServices = {
  getAnswers: async (survey_id: string) => {
    return await prisma.$queryRaw(
      RawQuery.survey.getAnswersAginstSurvey(survey_id)
    );
  },
};
const CRUDServices = service<"survey">("survey");

export const surveyService = { ...CRUDServices, ...customServices };
