export interface IUserCreateReq extends IUserGetReq {
    images?: File
}

export interface IUserGetReq {
    email: string
    password: string
}

export interface IUserService {
    create: (req:IUserCreateReq) => string
    get: (req:IUserGetReq) => string
}