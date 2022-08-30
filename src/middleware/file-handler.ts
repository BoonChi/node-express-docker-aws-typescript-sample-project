import { configs } from "@config/index";
import { IFile } from "@config/i-file";
import { Request, Response, NextFunction } from "express";
import fs from "fs";

export const fileHandler = (req: Request, _: Response, next: NextFunction) => {
  const { files } = req;

  const mappedFiles: IFile[] = ((files as Express.Multer.File[]) || []).map(
    (file) => ({
      name: `${file.originalname.split(".").shift()}`,
      type: file.mimetype,
      content: fs.readFileSync(configs.imageDir + "/" + file.originalname),
      size: file.size,
      extension: `${file.originalname.split(".").pop()}`,
    })
  );

  Object.assign(req.body, { images: mappedFiles });
  return next();
};