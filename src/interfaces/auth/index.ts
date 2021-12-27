import { BasicModels } from "@app/models";

export interface ILogin {
  email: string;
  password: string;
}

export interface IUser {
  id?: string;
  _id?: string;
  email: string;
  lastname: string;
  name: string;
  role: string;
  phone: string;
  password?: string;
}

export interface ILoginResponse extends BasicModels.IReqResponse {
  data: IUser;
}
