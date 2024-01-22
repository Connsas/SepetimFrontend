import { SingleResponseModel } from "./singleResponseModel";

export interface LoginRegisterResponseModel<T> extends SingleResponseModel<T>{
    userId:number;
    userName:string;
    userSurname:string;
}