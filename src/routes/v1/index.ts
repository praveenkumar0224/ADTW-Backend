import express from "express";
import authRoute from "./auth.route.js";
import userRoute from "./user.route.js";
import hostelRoute from "./hostel.route.js";
import questionRoute from "./question.route.js";
import assignedQuestionRoute from "./assigned_question.route.js";
import CategoryRoute from "./category.route.js"
import surveyRoute from "./survey.route.js";
import path from "path";

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
    path: "/category",
    route: CategoryRoute,
  },
];

for (const route of defaultRoutes) {
  router.use(route.path, route.route);
}

export default router;
