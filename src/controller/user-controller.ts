import express, { Router, Request, Response } from "express";
import UserService from "@service/user/user-service";
import { IUserGetReq } from "@service/user/i-user-service";
import { fileHandler } from "src/middleware/file-handler";
import { multerUpload } from "@service/multer/multer-service";
import { s3Service } from "@service/aws-s3/s3-service";
import { IFile } from "@config/i-file";

const router: Router = express.Router();

/* route register */
router.post('/register', async (req: Request<IUserGetReq>, res: Response) => {
    const {email, password} = req.body;
    const result =  await UserService.get({email, password});
    return res.status(200).json(result);
});

/* route login */
router.post('/login',
multerUpload.array('files'),
fileHandler,
 async (req: Request, res: Response) => {
    const {email, password, images } = req.body;
    if(images[0]?.name) {
        images.map(async(img:IFile) => await new s3Service().upload(img));
    }
    const result =  UserService.create({email, password, images});
    return res.status(200).json(result);
});

export default router;