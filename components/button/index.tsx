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

export default function IButton({ title, loadingTitle = "Loading...", onClick, disabled = false, loading = false, type = "submit", position = "text-right", children, customClass = "px-5 py-2.5" }: propsType) {

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
