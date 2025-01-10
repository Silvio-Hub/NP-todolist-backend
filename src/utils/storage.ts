import multer from "multer";

const storage = multer.diskStorage({
  destination: function (Req, File, cb) {
    cb(null, "uploads");
  },
  filename: function (Req, File, cb) {
    const splitExtention = File.originalname.split(".");
    const extention = `.${splitExtention[1]}`;
    cb(null, `${splitExtention[0]} ${Date.now()} ${extention}`);
  },
});

export default storage;
