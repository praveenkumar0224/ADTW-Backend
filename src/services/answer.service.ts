import { service } from "../lib/services/service.js";
import { Prisma } from "@prisma/client";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import { assignedSurveyService } from "./assigned_survey.service.js";

const CRUDServices = service<"answer">("answer");
const customServices = {
  createMany: async ({
    data,
    assigned_survey_id,
  }: {
    data: Array<Prisma.answerCreateManyInput>;
    assigned_survey_id: string;
  }) => {
    const assignedQuestionIDS = data.flatMap(
      (item) => item.assigned_question_id
    );
    const datawithAssignedQuestions = await CRUDServices.list(
      {
        assigned_question_id: {
          in: assignedQuestionIDS,
        },
      },
      {},
      {
        assigned_question: true,
      }
    );
    // if (!dovalidationCheck(data, datawithAssignedQuestions)) {
    //   throw new ApiError(
    //     httpStatus.BAD_REQUEST,
    //     "Manadatory questions need to be answered"
    //   );
    // }
    const createAnswers = await CRUDServices.createMany(data);
    await assignedSurveyService.update(
      {
        assigned_survey_id,
      },
      {
        survey_status: true,
      }
    );
    return createAnswers;
  },
};

const dovalidationCheck = (
  answers: Array<Prisma.answerCreateManyInput>,
  data: any[]
): boolean => {
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    if (element.assigned_question.is_mandatory) {
      const isAnswered = answers.find(
        (item) => item.assigned_question_id === element.assigned_question_id
      );
      return !!isAnswered;
    }
  }
  return true;
};

export const answerService = { ...CRUDServices, ...customServices };
