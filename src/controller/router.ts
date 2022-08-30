import type {Express} from 'express'
import userController from '@controller/user-controller';

export default function(app: Express) {
    app.use('/user', userController);
}