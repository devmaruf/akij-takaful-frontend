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
          // dispatch({ type: Types.SUBMIT_PAYMENT, payload: response });

          console.log('SSL res::', res);
          setTimeout(() => {
            if(res.data?.redirectGatewayURL !== null) {
              window.location.href = res.data.redirectGatewayURL
            }
          }, 1000);
      })
      .catch((error) => {
          response.isLoading = false;
          dispatch({ type: Types.SUBMIT_PAYMENT, payload: response });
      });
}
