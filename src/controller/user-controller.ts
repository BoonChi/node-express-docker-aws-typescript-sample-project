import express, { Router, Request, Response } from "express";
import UserService from "@service/user/user-service";
import { IUserGetReq } from "@service/user/i-user-service";
import { fileUploadToS3 } from "src/middleware/file-upload";
import { fileUploadToLocal } from "@service/multer/multer-service";

const router: Router = express.Router();

/* route register */
router.post('/register', async (req: Request<IUserGetReq>, res: Response) => {
    const {email, password} = req.body;
    const result =  await UserService.get({email, password});
    return res.status(200).json(result);
});

/* route login */
router.post('/login',
fileUploadToLocal.array('files'),
fileUploadToS3,
 async (req: Request, res: Response) => {
    const {email, password, images } = req.body;
    const result =  UserService.create({email, password, images});
    return res.status(200).json(result);
});

export default router;