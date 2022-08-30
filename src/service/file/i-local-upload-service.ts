import { IFile } from "@config/i-file";

type FileToUpload = IFile | IFile[];

export interface ILocalUploadService {
    upload(files:FileToUpload): void
};
