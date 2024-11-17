import express from 'express';
import validate from '../../middlewares/validate.js';
import auth from '../../middlewares/auth.js';
// import upload from '../../config/fileUpload.azure.js';
import * as fileUploadValidation from '../../validations/fileUpload.validation.js';
import * as fileUploadController from '../../controllers/fileUpload.controller.js';

const router = express.Router();

router.post(
  '/upload-file',
  auth('uploadFile'),
  //   upload.single('file'),
  validate(fileUploadValidation.fileUpload),
  fileUploadController.fileUpload
);

export default router;
