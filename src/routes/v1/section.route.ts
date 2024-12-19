import express from "express";
import auth from "../../middlewares/auth.js";
import validate from "../../middlewares/validate.js";
import * as sectionValidation from "../../validations/section.validation.js";
import { sectionController } from "../../controllers/section.controller.js";

const router = express.Router();

router
  .route("/")
  .post(
    auth("manage"),
    validate(sectionValidation.list),
    sectionController.list
  );
router
  .route("/paginate")
  .post(
    auth("get"),
    validate(sectionValidation.paginate),
    sectionController.paginate
  );
router
  .route("/create")
  .post(
    auth("manage"),
    validate(sectionValidation.create),
    sectionController.create
  );

router
  .route("/:section_id")
  .get(auth("get"), validate(sectionValidation.get), sectionController.get)
  .patch(
    auth("manage"),
    validate(sectionValidation.update),
    sectionController.update
  )
  .delete(
    auth("manage"),
    validate(sectionValidation.deleteData),
    sectionController.delete
  );

export default router;
