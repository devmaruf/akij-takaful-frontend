import { Dispatch } from "@reduxjs/toolkit";
import axios from "@/utils/axios";
import * as Types from "@/redux/types/medical-type";
import { Toaster } from "@/components/toaster";

export const changeMedicalInputValue = (name: string, value: any) => (dispatch: Dispatch) => {
    let data = {
        name: name,
        value: value,
    }
    dispatch({ type: Types.CHANGE_MEDICAL_INPUT, payload: data });
};

export const changeMedicalFileInputValue = (name: string, value: any,e:any,medicalId:number,medicalTestId:number) => (dispatch: Dispatch) => {
    let data = {
        name: name,
        file: value,
        medical_id:0,
        test_id:0
    }
    dispatch({ type: Types.CHANGE_MEDICAL_FILE_INPUT, payload: data });

    if (name === "file") {
        let reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            // data.name = "imagePreviewUrl";
            data.file = reader.result;
            data.medical_id = medicalId;
            data.test_id = medicalTestId;
            axios.post(`/medical-test-results`, data)
        .then((res) => {
            console.log('fileReponse', res)
            return
            dispatch({ type: Types.CHANGE_MEDICAL_FILE_INPUT, payload: response });
        }).catch((error) => {
            dispatch({ type: Types.CHANGE_MEDICAL_FILE_INPUT, payload: response })
        });
        };
        reader.readAsDataURL(file);
    }
};

export const submitMedicalAction = (medicalTestInput: any) => (dispatch: Dispatch) => {

    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: {},
    };
    dispatch({ type: Types.SUBMIT_MEDICAL, payload: response });

    axios.post(`/medical-tests`, medicalTestInput)
        .then((res) => {
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data;
            dispatch({ type: Types.SUBMIT_MEDICAL, payload: response });
            Toaster('success', response.message);
            dispatch(getMedicalListAction());
        }).catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.SUBMIT_MEDICAL, payload: response })
        });
}

export const getMedicalListAction = (currentPage: number = 1, dataLimit: number = 10, searchText = '') => (dispatch: Dispatch) => {
   
    
    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: [],
        medicalPaginationData: [],
    };
    dispatch({ type: Types.GET_MEDICAL_LIST, payload: response });
    
    axios.get(`medical?perPage=${dataLimit}&page=${currentPage}&search=${searchText}`)
        .then((res) => {
            console.log('medical', res)
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data.data;
            response.medicalPaginationData = res.data;
            dispatch({ type: Types.GET_MEDICAL_LIST, payload: response });
        }).catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.GET_MEDICAL_LIST, payload: response })
        })
}

export const getMedicalTestByAgeListAction = (proposal_id:number) => (dispatch: Dispatch) => {
   
    
    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: [],
    };
    dispatch({ type: Types.GET_MEDICAL_TEST_LIST_BY_AGE, payload: response });
    
    axios.get(`medical-test-list?posposal_id=${proposal_id}`)
        .then((res) => {
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data;
            dispatch({ type: Types.GET_MEDICAL_TEST_LIST_BY_AGE, payload: response });
        }).catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.GET_MEDICAL_TEST_LIST_BY_AGE, payload: response })
        })
}


export const getMedicalDetailsAction = (id: number | string) => (dispatch: Dispatch) => {
    if (isNaN(parseInt(id + ''))) {
        return;
    }

    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: null,
        inputData: {},
    };
    dispatch({ type: Types.GET_MEDICAL_DETAILS, payload: response });

    axios.get(`/medical/${parseInt(id + '')}`)
        .then(res => {
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data;
            dispatch({ type: Types.GET_MEDICAL_DETAILS, payload: response });
        })
        .catch(error => {
            response.isLoading = false;
            dispatch({ type: Types.GET_MEDICAL_DETAILS, payload: response });
        });
}

export const updateMedicalAction = (medicalInput: any, id: number, closeModal: any) => (dispatch: Dispatch) => {
    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: {},
    };
    dispatch({ type: Types.UPDATE_MEDICAL, payload: response });

    console.log('medicalInput', medicalInput)
    axios.put(`/medical/${id}`, medicalInput)
        .then((res) => {
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data;
            dispatch({ type: Types.UPDATE_MEDICAL, payload: response });
            Toaster('success', response.message);
            dispatch(getMedicalTestListAction())
            closeModal(false);
        }).catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.UPDATE_MEDICAL, payload: response })
        });
}

export const deleteMedicalAction = (id: any, setShowDeleteModal: any) => (dispatch: Dispatch) => {
    let responseData = {
        status: false,
        message: "",
        isLoading: true,
    };
    dispatch({ type: Types.DELETE_MEDICAL, payload: responseData });

    axios.delete(`/products/${id}`)
        .then(res => {
            responseData.isLoading = false;
            responseData.status = true;
            responseData.message = res.message;
            Toaster('success', responseData.message);
            setShowDeleteModal(false);
            dispatch(getMedicalListAction());
            dispatch({ type: Types.DELETE_MEDICAL, payload: responseData });
        })
        .catch(error => {
            responseData.isLoading = false;
            dispatch({ type: Types.DELETE_MEDICAL, payload: responseData })
        });
}
