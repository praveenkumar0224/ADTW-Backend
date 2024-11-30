import express from "express";
import auth from "../../middlewares/auth.js";
import validate from "../../middlewares/validate.js";
import * as answerValidation from "../../validations/answer.validation.js";
import { answerController } from "../../controllers/answer.controller.js";

const router = express.Router();

router
  .route("/")
  .post(auth("manage"), validate(answerValidation.list), answerController.list);
router
  .route("/paginate")
  .post(
    auth("get"),
    validate(answerValidation.paginate),
    answerController.paginate
  );
router
  .route("/create")
  .post(
    auth("manage"),
    validate(answerValidation.create),
    answerController.create
  );

router
  .route("/:question_id")
  .get(auth("get"), validate(answerValidation.get), answerController.get)
  .patch(
    auth("manage"),
    validate(answerValidation.update),
    answerController.update
  )
  .delete(
    auth("manage"),
    validate(answerValidation.deleteData),
    answerController.delete
  );

export default router;
