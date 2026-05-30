const multer = require('multer');
const path = require('path');
const { randomUUID } = require('crypto');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '../../uploads')),
    filename: (req, file, cb) => cb(null, `${randomUUID()}${path.extname(file.originalname)}`)
});
const imageFilter = (req, file, cb) => {
    if (['image/jpeg','image/jpg','image/png','image/webp','image/gif'].includes(file.mimetype)) cb(null, true);
    else cb(new Error('Only image files allowed.'), false);
};
const uploadSingle = multer({ storage, fileFilter: imageFilter, limits: { fileSize: 5 * 1024 * 1024 } }).single('image');
const uploadMultiple = multer({ storage, fileFilter: imageFilter, limits: { fileSize: 5 * 1024 * 1024 } }).array('images', 10);
const uploadDocument = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }).single('file');
module.exports = { uploadSingle, uploadMultiple, uploadDocument };
