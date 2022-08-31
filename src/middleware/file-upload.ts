import { configs } from "@config/index";
import { IFile } from "@config/i-file";
import { Request, Response, NextFunction } from "express";
import fs from "fs";
import { s3Service } from "@service/aws-s3/s3-service";

export const fileUploadToS3 = (req: Request, _: Response, next: NextFunction) => {
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

  if(mappedFiles.length > 0) {
    const uploadToAws =  new s3Service();
    mappedFiles.map(async(file:IFile) => await uploadToAws.upload(file));
  }

  Object.assign(req.body, { images: mappedFiles });
  return next();
};