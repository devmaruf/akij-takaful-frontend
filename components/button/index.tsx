import React from "react";

interface propsType {
    title?       : string;
    loadingTitle?: string;
    onClick      : React.SyntheticEvent | any;
    disabled?    : boolean;
    loading?     : boolean;
    position?    : string;
    type?        : string;
    customClass? : string;
    children?    : React.ReactNode;
}

/**
 * @param title - String | Nullable -- Button Title
 * @param loadingTitle - String | Nullable -- Loading Title
 * @param disabled - Boolean | Nullable -- True or False
 * @param isLoading - Boolean | Nullable -- True or False
 * @param position - String | | Nullable Nullable -- Button position Ex: text-left or text-right
 * @param type - Boolean | Nullable -- Button type
 * @param customClass - String | Nullable -- custom ClassName
 * @param onClick - Function -- Clickable function
 * @param children - React.ReactNode | Nullable -- Button type
 * @returns Button Component
 */

export const Button = ({ title, loadingTitle = "Loading...", onClick, disabled = false, loading = false, type = "submit", position = "text-right", children, customClass="px-5 py-2.5" }: propsType) => {

    return (
        <div className={position}>
            {
                loading ?
                    <button
                        className={`text-white bg-cyan-600 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm text-center animate-pulse leading-none ${customClass}`}
                        type="submit"
                        disabled={true}
                    >
                        {loadingTitle}
                    </button> :
                    <button
                        className={`text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm text-center ${customClass}`}
                        type="submit"
                        onClick={onClick}
                        disabled={disabled}
                    >
                        {(typeof title !== "undefined" && title !== null) ? title : children}
                    </button>
            }
        </div>
    );
};
