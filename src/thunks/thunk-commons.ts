import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { IRootState, AllActions } from "../reducers";
import { ServiceContext } from "..";

export type AppThunkDispatch = ThunkDispatch<IRootState, ServiceContext, AllActions>;
export type AppThunkAction<R = any> = ThunkAction<R, IRootState, ServiceContext, AllActions>;