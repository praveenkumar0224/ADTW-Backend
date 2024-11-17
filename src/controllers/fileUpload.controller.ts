// import { v4 as uuidv4 } from 'uuid';
import catchAsync from '../utils/catchAsync.js';
// import ApiError from '../utils/ApiError.js';
// import * as azurefile from '../config/fileUpload.azure.js';
import responseHandler from '../utils/response.js';

export const fileUpload = catchAsync(async (req, res) => {
  //   if (!req.file) {
  //     throw new ApiError(httpStatus.BAD_REQUEST, 'Image need to be selected');
  //   }
  //   const result = await azurefile.uploadImage(req.file, `${uuidv4()}`);
  return responseHandler(res);
});
