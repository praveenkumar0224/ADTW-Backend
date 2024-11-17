import express from "express";
import auth from "../../middlewares/auth.js";
import validate from "../../middlewares/validate.js";
import * as categoryValidation from "../../validations/category.validation.js";
import { categoryController } from "../../controllers/category.controller.js";

const router = express.Router();

router
  .route("/")
  .post(
    auth("manage"),
    validate(categoryValidation.list),
    categoryController.list
  );
router
  .route("/paginate")
  .post(
    auth("get"),
    validate(categoryValidation.paginate),
    categoryController.paginate
  );
router
  .route("/create")
  .post(
    auth("manage"),
    validate(categoryValidation.create),
    categoryController.create
  );

router
  .route("/:assigned_question_id")
  .get(auth("get"), validate(categoryValidation.get), categoryController.get)
  .patch(
    auth("manage"),
    validate(categoryValidation.update),
    categoryController.update
  )
  .delete(
    auth("manage"),
    validate(categoryValidation.deleteData),
    categoryController.delete
  );

export default router;
