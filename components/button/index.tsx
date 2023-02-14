import React from "react";

interface propsType {
    title    : string;
    onClick  : React.SyntheticEvent | any;
    disabled?: boolean;
    loading? : boolean;
    position?: string;
    type?    : string;
}

/**
 * @param Title - String -- Button Title
 * @param onClick - Function -- Clickable function
 * @param disabled - Boolean -- True or False
 * @param isLoading - Boolean -- True or False
 * @param position - String | Nullable -- Button position Ex: text-left or text-right
 * @param type - Boolean | Nullable -- Button type
 * @returns Button Component
 */

export const Button = ({ title, onClick, disabled = false, loading = false, type = "submit", position = "text-right" }: propsType) => {
    console.log('loading :>> ', loading);
    return (
        <div className={position}>
            {
                loading ?
                    <button
                        className="text-white bg-cyan-600 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center animate-pulse leading-none"
                        type="submit"
                        disabled={true}

                    >
                        Loading...
                    </button> :
                    <button
                        className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        type="submit"
                        onClick={onClick}
                        disabled={disabled}
                    >
                        {title}
                    </button>
            }
        </div>
    );
};
