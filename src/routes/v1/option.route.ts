import express from "express";
import auth from "../../middlewares/auth.js";
import validate from "../../middlewares/validate.js";
import * as optionValidation from "../../validations/option.validation.js";
import { optionController } from "../../controllers/option.controller.js";

const router = express.Router();

router
  .route("/")
  .post(auth("manage"), validate(optionValidation.list), optionController.list);
router
  .route("/paginate")
  .post(
    auth("get"),
    validate(optionValidation.paginate),
    optionController.paginate
  );
router
  .route("/create")
  .post(
    auth("manage"),
    validate(optionValidation.create),
    optionController.create
  );

router
  .route("/:option_id")
  .get(auth("get"), validate(optionValidation.get), optionController.get)
  .patch(
    auth("manage"),
    validate(optionValidation.update),
    optionController.update
  )
  .delete(
    auth("manage"),
    validate(optionValidation.deleteData),
    optionController.delete
  );

export default router;
