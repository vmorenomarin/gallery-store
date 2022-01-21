const multer = require("multer"); //Allow upload files.
const path = require("path"); // To work with file and directory path.
// const { pathToFileURL } = require("url"); // URL resolution and parsing
const { v4: uuidv4 } = require("uuid"); // Random UUID generator


const storage = multer.diskStorage({
  destination: path.join(__dirname, `../storage/imgs/`),
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname.toLocaleLowerCase()));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpg|jpeg|JPG|JPEG|PNG|png|svg|SVG/;
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error: file must has jpg|jpeg|JPG|JPEG|PNG|png|svg|SVG extension.");
  },
});

module.exports = upload;
