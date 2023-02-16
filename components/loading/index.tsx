import { Spinner } from "flowbite-react";
interface propsType {
    loadingTitle?: string;
    size?        : string;
    color?       : string;
}

export default function ILoading({ loadingTitle = "content", size = "md" }: propsType) {

    return (
        <div>
            <Spinner
                aria-label="Spinner button example"
                size={size}
            />
            <span className="pl-3 text-gray-900">
                Loading {loadingTitle}...
            </span>
        </div>
    )
}