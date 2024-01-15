import { SingleResponseModel } from "./singleResponseModel";

export interface LoginRegisterResponseModel<T> extends SingleResponseModel<T>{
    userId:number;
}