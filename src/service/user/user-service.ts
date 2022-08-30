import { IUserCreateReq, IUserService, IUserGetReq } from "./i-user-service";

class UserService implements IUserService {
    create(req:IUserCreateReq) {
        console.log(req);
        return "create user"
    }

    get(req:IUserGetReq) {
        console.log(req);
        return "get user"
    }
}

export default new UserService();