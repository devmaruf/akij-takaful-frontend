import { Tooltip as flowbiteTooltip } from "flowbite-react";

export default function Tooltip({ content = "Tooltip content", children }: { content: string, children: React.ReactNode }) {

    return (
        <flowbiteTooltip
            content={content}
            animation="duration-1000"
        >
            {
                children
            }
        </flowbiteTooltip>
    )
}