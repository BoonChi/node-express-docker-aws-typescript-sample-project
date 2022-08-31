import { S3Client,PutObjectCommand, CreateBucketCommand, GetBucketLocationCommand} from "@aws-sdk/client-s3";
import { configs } from "@config/index";
import { IFile } from "@config/i-file";
import { IS3Service } from "./i-s3-service";

class s3Service implements IS3Service {
    client: S3Client;
    bucketName: string;
    constructor() {
        if(!configs.s3.accessKeyId || !configs.s3.secretAccessKey || !configs.s3.bucket) {
            throw new Error("AWS S3 BUCKET Configuration Failure");
        }
        this.client = new S3Client({
            region: configs.s3.region,
            credentials: {
                accessKeyId: configs.s3.accessKeyId,
                secretAccessKey: configs.s3.secretAccessKey
              }
        });
        this.bucketName=configs.s3.bucket
    };

    private generateKey(file: IFile) {
        const timestamp = Date.now();
        return `${file.name}-${timestamp}.${file.extension}`;
    }

    private async create() {
        return await this.client.send(new CreateBucketCommand({
            Bucket:this.bucketName
        }))
    }

    private async get() {
        return await this.client.send(new GetBucketLocationCommand({
            Bucket:this.bucketName,
        }))
    }

    private async put(file: IFile) {
        const params = {
            Bucket: this.bucketName,
            Key: this.generateKey(file),
            ContentType: file.type,
            Body: file.content,
        };
        return await this.client.send(new PutObjectCommand(params));
    }

    async upload(file:IFile) {
        const bucketIsExisting = await this.get()
        if(!bucketIsExisting.$metadata.httpStatusCode) {
            await this.create();
        }
        return await this.put(file);
    }

}

export {s3Service};

