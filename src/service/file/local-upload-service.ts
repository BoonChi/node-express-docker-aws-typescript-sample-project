import { IFile } from "@config/i-file";
import { ILocalUploadService } from "./i-local-upload-service";

class LocalUploadService implements ILocalUploadService {
    async upload(file: IFile): Promise<void> {
        const timestamp = Date.now();
        const fileName = `${file.name}-${timestamp}.${file.extension}`;
    }

}

export {LocalUploadService}