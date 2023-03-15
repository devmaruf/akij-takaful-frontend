import Button from "@/components/button";
import Tooltip from '@/components/tooltip';

interface IViewIconButton {
    onClick: () => void;
}

interface IViewIconButtonTooltip extends IViewIconButton {
    toooltipTitle: string;
}

export function ViewIconButton({ onClick }: IViewIconButton) {
    return (
        <Button
            variant='default'
            customClass="p-1 rounded-md inline"
            onClick={onClick}
        >
            <i className='bi bi-eye'></i>
        </Button>
    )
}

export function ViewIconButtonTooltip({ onClick, toooltipTitle }: IViewIconButtonTooltip) {
    return (
        <Tooltip content={toooltipTitle}>
            <ViewIconButton onClick={onClick} />
        </Tooltip>
    )
}