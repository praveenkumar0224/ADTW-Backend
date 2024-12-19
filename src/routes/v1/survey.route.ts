import express from "express";
import auth from "../../middlewares/auth.js";
import validate from "../../middlewares/validate.js";
import * as surveyValidation from "../../validations/survey.validation.js";
import { surveyController } from "../../controllers/survey.controller.js";

const router = express.Router();

router
  .route("/")
  .post(auth("manage"), validate(surveyValidation.list), surveyController.list);
router
  .route("/paginate")
  .post(
    auth("get"),
    validate(surveyValidation.paginate),
    surveyController.paginate
  );
router
  .route("/create")
  .post(
    auth("manage"),
    validate(surveyValidation.create),
    surveyController.create
  );
router
  .route("/get-answers")
  .get(
    auth("get"),
    validate(surveyValidation.getAnswers),
    surveyController.getAnswers
  );
router
  .route("/:survey_id")
  .get(auth("get"), validate(surveyValidation.get), surveyController.get)
  .patch(
    auth("manage"),
    validate(surveyValidation.update),
    surveyController.update
  )
  .delete(
    auth("manage"),
    validate(surveyValidation.deleteData),
    surveyController.delete
  );

export default router;
