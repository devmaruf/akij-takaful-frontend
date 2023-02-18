
export interface IAuthReducer {
    isLoading   : boolean;
    isSubmitting: boolean;
    loginData   : any;
    loginInput  : {
        email   : string;
        password: string
    }
}

export interface IProject {
    isLoading            : boolean;
    isDeleting           : boolean;
    isLoadingDetails     : boolean;
    isSubmitting         : boolean;
    projectList          : any[];
    projectPaginationData: any[];
    projectDetails       : any;
    projectInput         : {
        name             : string;
        code             : string;
    }
}