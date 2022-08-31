import { configs } from "@config/index";
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, configs.imageDir)
      },
      filename: function (_req, file, cb) {
        cb(null, file.originalname)
      }
});

const fileUploadToLocal = multer({ storage: storage });

export {fileUploadToLocal};