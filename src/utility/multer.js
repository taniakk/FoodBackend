// import multer from 'multer'
// import path from 'path'
// import * as url from 'url'
// import fs from 'fs'

// const __dirname = url.fileURLToPath(new URL('.',import.meta.url))
// // const __filename = url.fileURLToPath(import.meta.url)

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, path.join(__dirname, '../uploads')); 
//     },
//     filename: (req, file, cb) => {
//       const uploadPath = path.join(__dirname, '../uploads', file.originalname);
  
//       if (fs.existsSync(uploadPath)) {
//         cb(null, file.originalname); 
//       } else {
//         cb(null, file.originalname); 
//       }
//     },
//   });
  
// const uploads = multer({
//     storage,
//     limits: {
//       fileSize: 1024 * 1024 * 5, // Limit file size to 5 MB
//     },
//     fileFilter: (req, file, cb) => {
//       if (file.mimetype.startsWith('image/')) {
//         cb(null, true); // Allow only image files
//       } else {
//         cb(new Error('Only image files are allowed!'), false);
//       }
//     },
//   });

// export default uploads

// const multer = require('multer');

import multer from 'multer';
const storage = multer.diskStorage({
  filename:function(req,file,cb){
    cb(null,file.originalname)
  }
})
const upload = multer({storage:storage})

export default upload