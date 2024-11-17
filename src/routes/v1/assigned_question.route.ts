import express from "express";
import auth from "../../middlewares/auth.js";
import validate from "../../middlewares/validate.js";
import * as assignedQuestionValidation from "../../validations/assignedQuestion.validation.js";
import { assignedQuestionController } from "../../controllers/assigned_question.controller.js";

const router = express.Router();

router
  .route("/")
  .post(
    auth("manage"),
    validate(assignedQuestionValidation.list),
    assignedQuestionController.list
  );
router
  .route("/paginate")
  .post(
    auth("get"),
    validate(assignedQuestionValidation.paginate),
    assignedQuestionController.paginate
  );
  router
  .route("/create")
  .post(auth("manage"), validate(assignedQuestionValidation.create), assignedQuestionController.create);

router
  .route("/:assigned_question_id")
  .get(
    auth("get"),
    validate(assignedQuestionValidation.get),
    assignedQuestionController.get
  )
  .patch(
    auth("manage"),
    validate(assignedQuestionValidation.update),
    assignedQuestionController.update
  )
  .delete(
    auth("manage"),
    validate(assignedQuestionValidation.deleteData),
    assignedQuestionController.delete
  );

export default router;
