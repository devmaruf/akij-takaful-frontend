
import * as Types from "../types/global-type";

export const handleSidebar = (isToggle: boolean = false) => (dispatch) => {
    dispatch({ type: Types.OPEN_SIDEBAR, payload: !isToggle });
}