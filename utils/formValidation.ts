import React from 'react';
export const formValidation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors: {[key: string]: string} = {};
    let isValid: boolean = true;
    const formElements = event.currentTarget.elements;
    
    for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i] as HTMLInputElement;
        if (element.required && (!element.value || element.value === "" || element.value === 0)) {
            let errorMessage = `${element.placeholder} is required` //
            // let errorMessage = `${element.name} is required`
            let replaceUnderscore = errorMessage.split("_");
            replaceUnderscore[0] = replaceUnderscore[0].charAt(0).toUpperCase() + replaceUnderscore[0].slice(1);
            errors[element.name] = replaceUnderscore.join(" ");
            isValid = false;
        }
    }
    return {errors, isValid};
}


