import express from "express";
import auth from "../../middlewares/auth.js";
import validate from "../../middlewares/validate.js";
import * as questionValidation from "../../validations/question.validation.js";
import { questionController } from "../../controllers/question.controller.js";

const router = express.Router();

router
  .route("/")
  .post(
    auth("manage"),
    validate(questionValidation.list),
    questionController.list
  );
router
  .route("/paginate")
  .post(
    auth("get"),
    validate(questionValidation.paginate),
    questionController.paginate
  );
router
  .route("/create")
  .post(
    // auth("manage"),
    validate(questionValidation.create),
    questionController.create
  );

router
  .route("/search")
  .get(
    auth("get"),
    validate(questionValidation.searchQuestion),
    questionController.serachQuestion
  );

router
  .route("/:question_id")
  .get(auth("get"), validate(questionValidation.get), questionController.get)
  .patch(
    auth("manage"),
    validate(questionValidation.update),
    questionController.update
  )
  .delete(
    auth("manage"),
    validate(questionValidation.deleteData),
    questionController.delete
  );

export default router;
