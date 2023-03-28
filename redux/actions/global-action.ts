import { Dispatch } from "@reduxjs/toolkit";

import { hasPermission } from "@/utils/permission";
import * as Types from "../types/global-type";

export const handleSidebar = (isToggle: boolean = false) => (dispatch: Dispatch) => {
    dispatch({ type: Types.OPEN_SIDEBAR, payload: !isToggle });
}

const getDashboardMenus = () => {
    const menu = {
        id: 'menu00',
        title: 'Dashboard',
        icon: 'bi-speedometer2',
        url: '',
        subMenu: []
    };

    if (hasPermission('dashboard.view') || hasPermission('financial_dashboard')) {
        if (hasPermission('dashboard.view')) {
            menu.subMenu.push({
                id: 'subMenu00.1',
                title: 'Dashboard',
                icon: 'bi-speedometer2',
                url: '/',
                subSubMenu: [],
            });
        }

        if (hasPermission('financial_dashboard')) {
            menu.subMenu.push({
                id: 'subMenu00.2',
                title: 'Financial Dashboard',
                icon: 'bi-cash-coin',
                url: '/dashboard/financial-dashboard',
                subSubMenu: [],
            });
        }

        return menu;
    }

    return null;
}

const getConfigurationMenu = () => {
    const menu = {
        id: 'menu04',
        title: 'Configurations',
        icon: 'bi-gear',
        url: '',
        subMenu: []
    };

    if (hasPermission('project.view') || hasPermission('branch.view') || hasPermission('role.view')) {
        if (hasPermission('project.view')) {
            menu.subMenu.push({
                id: 'subMenu04.1',
                title: 'Enlist bank',
                icon: 'bi-bank',
                url: '/settings/banks',
                subSubMenu: []
            });
        }

        if (hasPermission('branch.view')) {
            menu.subMenu.push({
                id: 'subMenu04.2',
                title: 'Open branch',
                icon: 'bi-bank2',
                url: '/settings/branches',
                subSubMenu: []
            });
        }

        if (hasPermission('role.view')) {
            menu.subMenu.push({
                id: 'subMenu04.3',
                title: 'Manage Roles',
                icon: 'bi-shield-check',
                url: '/settings/roles',
                subSubMenu: []
            });
        }

        return menu;
    }


    return null;
}

export const getSidebarMenuList = () => (dispatch: Dispatch) => {
    const menuList = [
        getDashboardMenus(),
        {
            id: 'menu01',
            title: 'Agent Management',
            icon: 'bi-people',
            url: '',
            subMenu: [
                {
                    id: 'subMenu01.1',
                    title: 'Manage Employees',
                    icon: 'bi-person',
                    url: '/employee',
                    subSubMenu: [],
                },
                {
                    id: 'subMenu01.2',
                    title: 'New Employee',
                    icon: 'bi-person-add',
                    url: '/employee/create',
                    subSubMenu: [],
                }
            ]
        },
        {
            id: 'menu02',
            title: 'Proposals',
            icon: 'bi-person-badge',
            url: '',
            subMenu: [
                {
                    id: 'subMenu02.2',
                    title: 'New Proposal',
                    icon: 'bi-person-fill-add',
                    url: '/proposals/create-preview',
                    subSubMenu: []
                },
                {
                    id: 'subMenu02.3',
                    title: 'Assign / Print Proposal',
                    icon: 'bi bi-printer',
                    url: '/proposals/print',
                    subSubMenu: []
                },
                {
                    id: 'subMenu02.4',
                    title: 'Stamps',
                    icon: 'bi-person-fill-add',
                    url: '/stamps',
                    subSubMenu: []
                },
            ]
        },
        {
            id: 'menu03',
            title: 'Worksheets',
            icon: 'bi-person-workspace',
            url: '',
            subMenu: [
                {
                    id: 'subMenu03.1',
                    title: 'Enlist Proposal',
                    icon: 'bi-clipboard-plus',
                    url: '/proposals',
                    subSubMenu: []
                },
                {
                    id: 'subMenu03.2',
                    title: 'Worksheets',
                    icon: 'bi-person-workspace',
                    url: '/worksheets/enlistment',
                    subSubMenu: []
                },
            ]
        },
        {
            id: 'menu06',
            title: 'Expense',
            icon: 'bi-cash',
            url: '',
            subMenu: [
                {
                    id: 'subMenu02.2',
                    title: 'New Expense',
                    icon: 'bi-clipboard-plus',
                    url: '/expense/create',
                    subSubMenu: []
                },
                {
                    id: 'subMenu02.3',
                    title: 'Expense List',
                    icon: 'bi-list-ul',
                    url: '/expense/',
                    subSubMenu: []
                },
            ]
        },
        getConfigurationMenu()
    ]

    dispatch({ type: Types.SIDEBAR_MENU_LIST, payload: menuList });
}