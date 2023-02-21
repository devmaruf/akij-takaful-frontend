
import * as Types from "../types/global-type";

export const handleSidebar = (isToggle: boolean = false) => (dispatch) => {
    dispatch({ type: Types.OPEN_SIDEBAR, payload: !isToggle });
}

export const getSidebarMenuList = () => (dispatch) => {
    const menuList = [
        {
            id: 'menu01',
            title: 'HR Management',
            icon: 'fa-solid fa-list-check',
            url: '',
            subMenu: [
                {
                    id: 'subMenu01.1',
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
            id: 'menu02',
            title: 'Proposals',
            icon: 'fa-brands fa-buffer',
            url: '',
            subMenu: [
                {
                    id: 'subMenu02.1',
                    title: 'Proposal List',
                    url: '/proposals',
                    subSubMenu: []
                },
                {
                    id: 'subMenu02.2',
                    title: 'Create Proposal',
                    url: '/proposals/create',
                    subSubMenu: []
                },
                
            ]
        },

        {
            id: 'menu03',
            title: 'Settings',
            icon: 'fa-solid fa-screwdriver-wrench',
            url: '',
            subMenu: [
                {
                    id: 'subMenu03.1',
                    title: 'Project',
                    url: '',
                    subSubMenu: [
                        { title: 'Project List', url: '/settings/projects' },
                    ]
                },
                {
                    id: 'subMenu03.2',
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