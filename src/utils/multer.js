const multer = require('multer');
const path = require('path');

const multer = (req, res, next) => {
    try {
        storage= multer.diskStorage({}),
        fileFilter= (req, file, cb) => {
            let ext = path.extname(file.originalname);
            if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".JPG" && ext !== ".JPEG" && ext !== ".PNG" && ext !== '.mp4' && ext !== '.MP4') {
                cb(new Error("file is not supported"), false);
                return;
            }
            cb(null, true);
        }

    } catch(error) {
        res.status(401).json(`file upload failed ${error.message}`)
    }
}

module.exports = {
    multer
}
