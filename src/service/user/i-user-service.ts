import { IFile } from "@config/i-file"

export interface IUserCreateReq extends IUserGetReq {
    images?: IFile[]
}

export interface IUserGetReq {
    email: string
    password: string
}

export interface IUserService {
    create: (req:IUserCreateReq) => string
    get: (req:IUserGetReq) => string
}