import axios from "@/utils/axios";
import * as Types from "@/redux/types/payment-type";
import { Toaster } from "@/components/toaster";
import { Dispatch } from "@reduxjs/toolkit";


export const changeInputValue = (name: string, value: any) => (dispatch: Dispatch) => {
  let data = {
    name: name,
    value: value,
  }
  dispatch({ type: Types.CHANGE_INPUT_VALUE, payload: data });
};

export const submitPaymentAction = (paymentForm: any, router: any) => (dispatch: Dispatch) => {
  let response = {
    status: false,
    message: "",
    isLoading: true,
  };
  dispatch({ type: Types.SUBMIT_PAYMENT, payload: response });

  axios.post(`/payment`, paymentForm)
    .then((res) => {
      response.status = true;
      response.isLoading = false;
      response.message = res.message;
      Toaster('success', response.message);
      console.log('res.data', res.data)
      setTimeout(() => {
        if (res.data?.forwarding_url !== null) {
          window.location.href = res.data.forwarding_url
        } else {
          dispatch({ type: Types.SUBMIT_PAYMENT, payload: response });
        }
      }, 1000);
    })
    .catch((error) => {
      response.isLoading = false;
      dispatch({ type: Types.SUBMIT_PAYMENT, payload: response });
    });
}

export const getPaymentListAction = (currentPage: number = 1, dataLimit: number = 10, searchText: string = '', isAgent: boolean = false) => (dispatch: Dispatch) => {
  let response = {
    status: false,
    message: "",
    isLoading: true,
    data: [],
    paginationData: [],
  };
  dispatch({ type: Types.GET_PAYMENT_LIST, payload: response });

  const resourceUrl = isAgent ? 'agents' : 'employees';

  axios.get(`/payment/index?perPage=${dataLimit}&page=${currentPage}&search=${searchText}`)
    .then((res) => {
      response.isLoading = false;
      response.status = true;
      response.message = res.message;
      response.data = res.data.data;
      response.paginationData = res.data;
      dispatch({ type: Types.GET_PAYMENT_LIST, payload: response });
    }).catch((error) => {
      response.isLoading = false;
      dispatch({ type: Types.GET_PAYMENT_LIST, payload: response })
    })

}

export const paymentStatusChangeAction = (paymentID: any, paymentStatus: string, setShowModal: any) => (dispatch: Dispatch) => {
  let response = {
    status: false,
    message: "",
    isLoading: true,
  };
  dispatch({ type: Types.SUBMIT_PAYMENT, payload: response });

  axios.post(`/payment/status-change?id=${paymentID}&status=${paymentStatus}`, "")
    .then((res) => {
      response.status = true;
      response.isLoading = false;
      response.message = res.message;
      Toaster('success', response.message);
      setShowModal(false);
      dispatch(getPaymentListAction())
      dispatch({ type: Types.SUBMIT_PAYMENT, payload: response });
    })
    .catch((error) => {
      response.isLoading = false;
      setShowModal(false);
      dispatch({ type: Types.SUBMIT_PAYMENT, payload: response });
    });
}


export const searchPaymentProposalAction = (proposalNo: string = '') => (dispatch: Dispatch) => {
  let response = {
    status: false,
    message: "",
    isLoading: true,
    data: {},
  };

  dispatch({ type: Types.SEARCH_PAYMENT_PROPOSAL, payload: response });

  axios.get(`/payment/search-by-proposal-no?proposal_no=${proposalNo}`)
    .then((res) => {
      response.isLoading = false;
      response.status = true;
      response.message = res.message;
      response.data = res.data;
      dispatch({ type: Types.SEARCH_PAYMENT_PROPOSAL, payload: response });
    }).catch((error) => {
      response.isLoading = false;
      dispatch({ type: Types.SEARCH_PAYMENT_PROPOSAL, payload: response })
    })

}