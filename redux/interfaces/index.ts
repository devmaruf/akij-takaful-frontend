
export interface IAuthReducer {
    isLoading   : boolean;
    isSubmitting: boolean;
    loginData   : any;
    loginInput  : {
        email   : string;
        password: string
    }
}