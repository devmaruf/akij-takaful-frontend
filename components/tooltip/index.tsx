
import React from "react";

import { Tooltip } from "flowbite-react";

/**
 * 
 * @param content - string 
 * @param children - Node Element 
 * @returns ToolTip
 */
export default function ToolTip({ content = "Tooltip content", children }: { content: string, children: React.ReactNode }) {

    return (
        <Tooltip
            content={content}
            animation="duration-1000"
        >
            {
                children
            }
        </Tooltip>
    )
}