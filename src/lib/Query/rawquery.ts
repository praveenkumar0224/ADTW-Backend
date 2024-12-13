import { Prisma } from "@prisma/client";

const deleteExpiredOtps = Prisma.sql`delete FROM otp WHERE EXTRACT(EPOCH FROM NOW() - otp."createdAt") >= expires_in::numeric;`;
const otp = {
  deleteExpiredOtps,
};

const getAnswersAginstSurvey = (survey_id: string) => Prisma.sql`select 
survey.survey_id,
survey.survey_name,
"user".user_id,
"user".name,
hostel.hostel_name_tamil,
hostel.hostel_name_english,
hostel.hostel_id,
question.question_id,
question.question,
question.question_desc,
answer.answer_id,
answer.answer
from survey 
inner join assigned_survey on assigned_survey.survey_id = survey.survey_id
inner join "user" on "user".user_id = assigned_survey.user_id
inner join hostel on hostel.hostel_id = assigned_survey.hostel_id
inner join section on section.survey_id = survey.survey_id
inner join assigned_question on assigned_question.section_id = section.section_id
inner join question on question.question_id = assigned_question.question_id
inner join answer on answer.assigned_question_id = assigned_question.assigned_question_id
where survey.survey_id = ${survey_id}
`;

const survey = {
  getAnswersAginstSurvey,
};

export default {
  otp,
  survey,
};
