import { Dispatch, AnyAction } from 'redux';

export interface inputType{
    name: string,
    value: any,
    e?: any
}

export interface dispatchType{
    dispatch: Dispatch<AnyAction>;
}