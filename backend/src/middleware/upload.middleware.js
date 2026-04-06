const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '../../uploads')),
    filename: (req, file, cb) => cb(null, `${uuidv4()}${path.extname(file.originalname)}`)
});
const imageFilter = (req, file, cb) => {
    if (['image/jpeg','image/jpg','image/png','image/webp','image/gif'].includes(file.mimetype)) cb(null, true);
    else cb(new Error('Only image files allowed.'), false);
};
const uploadSingle = multer({ storage, fileFilter: imageFilter, limits: { fileSize: 5 * 1024 * 1024 } }).single('image');
const uploadMultiple = multer({ storage, fileFilter: imageFilter, limits: { fileSize: 5 * 1024 * 1024 } }).array('images', 10);
module.exports = { uploadSingle, uploadMultiple };
