import express from "express";
import auth from "../../middlewares/auth.js";
import validate from "../../middlewares/validate.js";
import * as assignedSurveyValidation from "../../validations/assignedSurvey.validation.js";
import { assignedSurveyController } from "../../controllers/assigned_survey.controller.js";

const router = express.Router();

router
  .route("/")
  .post(
    auth("manage"),
    validate(assignedSurveyValidation.list),
    assignedSurveyController.list
  );
router
  .route("/paginate")
  .post(
    auth("get"),
    validate(assignedSurveyValidation.paginate),
    assignedSurveyController.paginate
  );
router
  .route("/create")
  .post(
    auth("manage"),
    validate(assignedSurveyValidation.create),
    assignedSurveyController.create
  );
router
  .route("/create-bulk")
  .post(
    auth("manage"),
    validate(assignedSurveyValidation.createMany),
    assignedSurveyController.createMany
  );

router
  .route("/:assigned_question_id")
  .get(
    auth("get"),
    validate(assignedSurveyValidation.get),
    assignedSurveyController.get
  )
  .patch(
    auth("manage"),
    validate(assignedSurveyValidation.update),
    assignedSurveyController.update
  )
  .delete(
    auth("manage"),
    validate(assignedSurveyValidation.deleteData),
    assignedSurveyController.delete
  );

export default router;
