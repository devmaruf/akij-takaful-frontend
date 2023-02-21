
export interface IAuthReducer {
    isLoading   : boolean;
    isSubmitting: boolean;
    loginData   : any;
    loginInput  : {
        email   : string;
        password: string
    }
}

export interface ISelect2Item {
    label: string;
    value: number | string;
}

export interface IProject {
    isLoading            : boolean;
    isDeleting           : boolean;
    isLoadingDetails     : boolean;
    isSubmitting         : boolean;
    projectOptionList    : any[];
    projectList          : any[];
    projectPaginationData: any[];
    projectDetails       : any;
    projectInput         : {
        name             : string;
        code             : string;
    },
    projectDropdownList: Array<ISelect2Item>
}

export interface IBranch {
    isLoading           : boolean;
    isDeleting          : boolean;
    isLoadingDetails    : boolean;
    isSubmitting        : boolean;
    branchList          : any[];
    branchPaginationData: any[];
    branchDetails       : any;
    branchInput         : {
        project_id      : number;
        name            : string;
        code            : string;
    }
}


export interface IEmployee {
    isLoading             : boolean;
    isDeleting            : boolean;
    isLoadingDetails      : boolean;
    isSubmitting          : boolean;
    employeeList          : any[];
    employeePaginationData: any[];
    employeeDetails       : any;
    employeeInput         : {
        first_name        : number;
        last_name         : string;
        email             : string;
        designation_id    : number;
        phone             : string;
        avatar            : string;
        password          : string;
        confirm_password  : string;
    }
}

