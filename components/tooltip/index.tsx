import { Tooltip } from "flowbite-react";

export default function ITooltip({ content = "Tooltip content", children }: { content: string, children: React.ReactNode }) {

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