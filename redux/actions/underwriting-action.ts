import { Dispatch } from "@reduxjs/toolkit";
import axios from "@/utils/axios";
import * as Types from "../types/underwriting-type";
import { IUnderwritingRequirement, IUnderwritingType } from "../interfaces";

export const getUnderwritingConfigurationsAction = (proposalId: number) => (dispatch: Dispatch) => {
    if (isNaN(parseInt(proposalId + ''))) {
        return;
    }

    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: [],
    };
    dispatch({ type: Types.GET_UNDERWRITING_CONFIGURATIONS, payload: response });

    axios.get(`/underwritings?proposal_id=${proposalId}`)
        .then((res) => {
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data;
            dispatch({ type: Types.GET_UNDERWRITING_CONFIGURATIONS, payload: response });
        }).catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.GET_UNDERWRITING_CONFIGURATIONS, payload: response })
        })

}

export const setUnderwritingConfigurationsAction = (
    inputType: IUnderwritingType,
    inputRequirement: IUnderwritingRequirement,
    e: any,
    inputConfigurations: Array<IUnderwritingType>
) => (dispatch) => {
    let value: any;
    const configurations: IUnderwritingType[] = [];

    if (inputRequirement.input_type === 'checkbox') {
        value = e.target.checked ? 1 : 0;
    } else if (inputRequirement.input_type === 'switch') {
        value = e ? 1 : 0;
    }

    inputConfigurations.forEach((previousType: IUnderwritingType) => {
        let currentType = {...previousType};
        currentType.requirements = [];

        if (currentType.code === inputType.code) {
            previousType.requirements.forEach((requirement: IUnderwritingRequirement) => {
                if (requirement.code === inputRequirement.code) {
                    const newRequirement = {
                        ...requirement,
                        value: value,
                    }
                    currentType.requirements.push(newRequirement);
                } else {
                    currentType.requirements.push(requirement);
                }
            })
        } else {
            currentType.requirements = [...previousType.requirements];
        }

        configurations.push(currentType);
    });

    dispatch({ type: Types.SET_UNDERWRITING_CONFIGURATION_VALUE, payload: configurations });
}
