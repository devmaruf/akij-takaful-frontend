
import * as Types from "../types/global-type";

export const handleSidebar = (isToggle: boolean = false) => (dispatch) => {
    dispatch({ type: Types.OPEN_SIDEBAR, payload: !isToggle });
}

export const getSidebarMenuList = () => (dispatch) => {
    const menuList = [
        {
            id: 'menu00',
            title: 'Dashboard',
            icon: 'fa-solid fa-list-check',
            url: '',
            subMenu: [
                {
                    id: 'subMenu00.1',
                    title: 'Dashboard',
                    url: '/',
                    subSubMenu: [],
                },
                {
                    id: 'subMenu00.2',
                    title: 'Financial Dashboard',
                    url: '/dashboard/financial-dashboard',
                    subSubMenu: [],
                }
            ]
        },
        {
            id: 'menu01',
            title: 'HR Management',
            icon: 'fa-solid fa-list-check',
            url: '',
            subMenu: [
                {
                    id: 'subMenu01.1',
                    title: 'Manage Employees',
                    url: '/employee',
                    subSubMenu: [],
                },
                {
                    id: 'subMenu01.2',
                    title: 'New Employee',
                    url: '/employee/create',
                    subSubMenu: [],
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
                    title: 'Manage Proposals',
                    url: '/proposals',
                    subSubMenu: []
                },
                {
                    id: 'subMenu02.2',
                    title: 'New Proposal',
                    url: '/proposals/create',
                    subSubMenu: []
                },

            ]
        },
        {
            id: 'menu03',
            title: 'Worksheets',
            icon: 'fa-brands fa-buffer',
            url: '',
            subMenu: [
                {
                    id: 'subMenu03.1',
                    title: 'Manage Worksheets',
                    url: '/proposals',
                    subSubMenu: []
                },
                {
                    id: 'subMenu03.2',
                    title: 'New Worksheet',
                    url: '/proposals/create',
                    subSubMenu: []
                },
                {
                    id: 'subMenu03.3',
                    title: 'Underwriting',
                    url: '/under-writing',
                    subSubMenu: []
                },
            ]
        },
        {
            id: 'menu04',
            title: 'Configurations',
            icon: 'fa-solid fa-screwdriver-wrench',
            url: '',
            subMenu: [
                {
                    id: 'subMenu04.1',
                    title: 'Enlist bank',
                    url: '/settings/banks',
                    subSubMenu: []
                },
                {
                    id: 'subMenu04.2',
                    title: 'Open branch',
                    url: '/settings/branches',
                    subSubMenu: []
                },
            ]
        }
    ]


    dispatch({ type: Types.SIDEBAR_MENU_LIST, payload: menuList });

}