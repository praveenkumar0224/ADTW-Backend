// // import { BlobServiceClient } from '@azure/storage-blob';
// import multer from 'multer';
// import config from './config.js';
// const storage = multer.memoryStorage();

// const sasUrl = config.azure.sasurl;
// const sasToken = config.azure.sastoken;

// const blobServiceClient = new BlobServiceClient(`${sasUrl}${sasToken}`);

// const containerName = config.azure.container_name;
// const containerClient = blobServiceClient.getContainerClient(containerName);

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

// export const uploadImage = async (files: any, fileName: string) => {
//   const blockBlobClient = containerClient.getBlockBlobClient(fileName);
//   await blockBlobClient.upload(files.buffer, files.size);
//   const imageUrl = `${sasUrl}/${containerName}/${fileName}`;
//   return imageUrl;
// };
