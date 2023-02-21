
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
    branchDropdownList  : Array<ISelect2Item>
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
        first_name        : string;
        last_name         : string;
        email             : string;
        designation_id    : number;
        role_id           : number;
        project_id        : number;
        branch_ids        : Array<Number>;
        phone             : string;
        avatar            : string;
        password          : string;
        confirm_password  : string;
    }
}

export interface IDesignation {
    isLoading            : boolean;
    isDeleting           : boolean;
    isLoadingDetails     : boolean;
    isSubmitting         : boolean;
    designationDropdownList: Array<ISelect2Item>
}

export interface IGlobal {
    isOpenSidebar: boolean;
}
