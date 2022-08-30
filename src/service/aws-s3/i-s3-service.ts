import type{ PutObjectCommandOutput } from "@aws-sdk/client-s3";
import { IFile } from "@config/i-file";

export interface IS3Service{
    upload(file:IFile): Promise<PutObjectCommandOutput>,
}