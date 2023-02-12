import React from "react";

interface propsType {
    title?: string;
}

/**
 * Page Title Component
 * @param string title - Page Title
 * @returns PageTitle Component
 */

export default function PageTitle({ title = "Page Title" }: propsType) {
    return (
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 capitalize">{title}</h1>
    )
}