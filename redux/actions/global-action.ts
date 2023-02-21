
import * as Types from "../types/global-type";

export const handleSidebar = (isToggle: boolean = false) => (dispatch) => {
    dispatch({ type: Types.OPEN_SIDEBAR, payload: !isToggle });
}

export const getSidebarMenuList = () => (dispatch) => {
    const menuList = [
        {
            title: 'HR Management',
            icon: 'fa-solid fa-list-check',
            url: '',
            subMenu: [
                {
                    title: 'Employee',
                    url: '',
                    subSubMenu: [
                        { title: 'Employee List', url: '/employee' },
                        { title: 'Employee Create', url: '/employee/create' }
                    ]
                }
            ]
        },
        {
            title: 'Proposals',
            icon: 'fa-brands fa-buffer',
            url: '',
            subMenu: [
                {
                    title: 'Proposal List',
                    url: '/proposals',
                    subSubMenu: []
                },
                {
                    title: 'Create Proposal',
                    url: '/proposals/create',
                    subSubMenu: []
                },
                
            ]
        },

        {
            title: 'Settings',
            icon: 'fa-solid fa-screwdriver-wrench',
            url: '',
            subMenu: [
                {
                    title: 'Project',
                    url: '',
                    subSubMenu: [
                        { title: 'Project List', url: '/settings/projects' },
                    ]
                },
                {
                    title: 'Branch',
                    url: '',
                    subSubMenu: [
                        { title: 'Branch List', url: '/settings/branches' },
                    ]
                },
            ]
        }
    ]


    dispatch({ type: Types.SIDEBAR_MENU_LIST, payload: menuList });

}