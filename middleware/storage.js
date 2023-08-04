const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (_req, file, callback) => {
    let folder = "";

    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      folder = "public/images";
    }

    if (file.mimetype === "audio/mpeg") {
      folder = "public/audio";
    }

    callback(null, folder);
  },

  // generate unique filename
  filename: (_req, file, callback) => {
    const fileName = Date.now() + path.extname(file.originalname);
    callback(null, fileName);
  },
});

const upload = multer({
  storage: storage,

  // add file filter
  fileFilter: (req, file, callback, next) => {
    try {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg" ||
        file.mimetype == "audio/mpeg"
      ) {
        callback(null, true);
      } else {
        const err = new Error(
          "only png, jpg, jpeg and mp3 are allowed to upload"
        );
        callback(err, false);
      }
    } catch (err) {
      next(err);
    }
  },

  //error handling
  onError: (err, next) => {
    console.log(err);
  },
});

module.exports = upload;
