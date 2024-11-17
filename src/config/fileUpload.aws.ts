// import AWS from 'aws-sdk';
// import multer from 'multer';
// import { v4 as uuidv4 } from 'uuid';
// import config from './config.js';
// import * as Express from 'express';
// import ApiError from '../utils/ApiError.js';
// import httpStatus from 'http-status';

// const storage = multer.memoryStorage();

// const s3Config = new AWS.S3({
//   accessKeyId: config.aws.bucketAccessKey,
//   secretAccessKey: config.aws.bucketSecretKey,
//   region: config.aws.bucketRegion
// });
// // eslint-disable-next-line
// const fileFilter = (req: Express.Request, file: any, cb: Function) => {
//   if (!file) {
//     cb(new Error('File is required'), false);
//   }
//   if (file.mimetype.split('/')[0] === 'image') {
//     cb(null, true);
//   } else {
//     cb(new Error('LIMIT_UNEXPECTED_FILE'), false);
//   }
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 1024 * 1024 * 3 }
// });
// export default upload;

// export const s3CreateObject = async (files: any, fileName: string) => {
//   const params = files.map((file: any) => {
//     return {
//       Bucket: config.aws.bucketName,
//       Key: fileName ? `${fileName}` : `${uuidv4()}`,
//       Body: file.buffer,
//       ACL: 'public-read',
//       CacheControl: 'max-age=6400',
//       ContentType: file.mimetype
//     };
//   });

//   return await Promise.all(
//     params.map((param: any) => {
//       return s3Config.upload(param).promise();
//     })
//   ).catch((err: Express.Errback) => {
//     throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.toString());
//   });
// };

// export const s3DeleteObject = async (file: string) => {
//   const param = { Bucket: config.aws.bucketName, Key: file };
//   if (file) {
//     const deletePromise = new Promise(async function (resolve, reject) {
//       s3Config.deleteObject(param, function (err, data) {
//         if (err) {
//           reject(data);
//         } else {
//           resolve(data);
//         }
//       });
//     });

//     return deletePromise.catch((err) => {
//       throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.toString());
//     });
//   }
// };
