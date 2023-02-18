import { Spinner } from "flowbite-react";
interface ILoading {
    loadingTitle?: string;
    size?        : string;
    color?       : string;
}

export default function Loading({ loadingTitle = "content", size = "md" }: ILoading) {

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