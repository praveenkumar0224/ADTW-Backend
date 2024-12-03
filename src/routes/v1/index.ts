import express from "express";
import authRoute from "./auth.route.js";
import userRoute from "./user.route.js";
import hostelRoute from "./hostel.route.js";
import questionRoute from "./question.route.js";
import assignedQuestionRoute from "./assigned_question.route.js";
import surveyRoute from "./survey.route.js";
import answerRoute from "./answer.route.js";
import optionRoute from "./option.route.js";
import categoryRoute from "./category.route.js"

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/hostel",
    route: hostelRoute,
  },
  {
    path: "/question",
    route: questionRoute,
  },
  {
    path: "/assigned-question",
    route: assignedQuestionRoute,
  },
  {
    path: "/survey",
    route: surveyRoute,
  },
  {
    path: "/answer",
    route: answerRoute,
  },
  {
    path: "/option",
    route: optionRoute,
  },
  {
    path: "/category",
    route: categoryRoute,
  },
];

for (const route of defaultRoutes) {
  router.use(route.path, route.route);
}

export default router;
