import { Dispatch } from "@reduxjs/toolkit";
import axios from "@/utils/axios";
import * as Types from "@/redux/types/underwriting-type";
import { IUnderwriting, IUnderwritingRequirement, IUnderwritingType, IUnderwritingView } from "@/redux/interfaces";
import { Toaster } from "@/components/toaster";

export const changeUnderwritingInputAction = (name: string, value: any, underwritingForm: IUnderwritingView) => (dispatch: any) => {
    dispatch({
        type: Types.CHANGE_UNDERWRITING_INPUT,
        payload: {
            name: name,
            value: value,
        }
    });

    if (
        name === 'em_life'
        || name === 'em_hi'
        || name === 'em_ci'
        || name === 'em_pdab'
        || name === 'em_diab'
    ) {
        const sumAtRisk = underwritingForm.initial_sum_assured;

        const totalAccepted: number = (parseFloat(underwritingForm.em_life + '') ?? 0) +
            (parseFloat(underwritingForm.em_hi + '') ?? 0) +
            (parseFloat(underwritingForm.em_ci + '') ?? 0) +
            (parseFloat(underwritingForm.em_pdab + '') ?? 0) +
            (parseFloat(underwritingForm.em_diab + '') ?? 0);

        const totalEm = calculateUnderwritingRateBy(totalAccepted, sumAtRisk);

        dispatch({
            type: Types.CHANGE_UNDERWRITING_INPUT,
            payload: {
                name: 'total_em',
                value: parseFloat((totalEm + '')).toFixed(3),
            }
        });

        dispatch({
            type: Types.CHANGE_UNDERWRITING_INPUT,
            payload: {
                name: 'total_premium',
                value: (parseFloat((sumAtRisk + '')) + parseFloat((totalEm + ''))).toFixed(3),
            }
        });
    }
};

export const calculateUnderwritingRateBy = (totalAccepted: number, sumAtRisk: number) => {
    // (((2.03+2.03)*xxx%) * Sum at risk)/1000
    return (((2.03 + 2.03) * (totalAccepted / 100)) * sumAtRisk) / 1000;
}

export const getUnderwritingByProposalAction = (proposalId: number) => (dispatch: Dispatch) => {
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
            res.data.total_premium = res.data?.total_premium ?? 0;
            res.data.accepted_standard_rate_for = JSON.parse(res.data.accepted_standard_rate_for);
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
) => (dispatch: Dispatch) => {
    let value: any;
    const configurations: IUnderwritingType[] = [];

    if (inputRequirement.input_type === 'checkbox') {
        value = e.target.checked ? 1 : 0;
    } else if (inputRequirement.input_type === 'switch') {
        value = e ? 1 : 0;
    }

    inputConfigurations.forEach((previousType: IUnderwritingType) => {
        let currentType = { ...previousType };
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

export const submitUnderwritingAction = (underwriting: IUnderwriting, router: any) => (dispatch: Dispatch) => {
    let response = {
        status: false,
        message: "",
        isLoading: true,
        isApproving: true,
        data: [],
    };

    dispatch({ type: Types.SAVE_UNDERWRITING, payload: response });

    underwriting = {
        ...underwriting,
        em_life: underwriting.em_life === '' ? 0 : parseInt(underwriting.em_life ?? ''),
        em_hi: underwriting.em_hi === '' ? 0 : parseInt(underwriting.em_hi ?? ''),
        em_ci: underwriting.em_ci === '' ? 0 : parseInt(underwriting.em_ci ?? ''),
        em_pdab: underwriting.em_pdab === '' ? 0 : parseInt(underwriting.em_pdab ?? ''),
        em_diab: underwriting.em_diab === '' ? 0 : parseInt(underwriting.em_diab ?? ''),
        total_em: underwriting.total_em === '' ? 0 : parseInt(underwriting.total_em ?? ''),
        total_premium: underwriting.total_premium === '' ? 0 : parseInt(underwriting.total_premium ?? ''),
    }

    axios.post(`/underwritings`, underwriting)
        .then((res) => {
            response.isLoading = false;
            response.isApproving = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data;
            Toaster('success', res.message);
            dispatch({ type: Types.SAVE_UNDERWRITING, payload: response });
            router.push('/proposals');
        }).catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.SAVE_UNDERWRITING, payload: response })
        })
}