import express from "express";
import auth from "../../middlewares/auth.js";
import validate from "../../middlewares/validate.js";
import * as hostelValidation from "../../validations/hostel.validation.js";
import { hostelController } from "../../controllers/hostel.controller.js";

const router = express.Router();

router
  .route("/")
  .post(auth("manage"), validate(hostelValidation.list), hostelController.list);
router
  .route("/paginate")
  .post(
    auth("manage"),
    validate(hostelValidation.paginate),
    hostelController.paginate
  );
router
  .route("/create")
  .post(
    auth("manage"),
    validate(hostelValidation.create),
    hostelController.create
  );
router
  .route("/search")
  .get(
    auth("get"),
    validate(hostelValidation.searchHostel),
    hostelController.searchHostel
  );
router
  .route("/:hostel_id")
  .get(auth("get"), validate(hostelValidation.get), hostelController.get)
  .patch(
    auth("manage"),
    validate(hostelValidation.update),
    hostelController.update
  )
  .delete(
    auth("manage"),
    validate(hostelValidation.deleteData),
    hostelController.delete
  );

export default router;
