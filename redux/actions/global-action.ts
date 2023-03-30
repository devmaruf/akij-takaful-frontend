import { Dispatch } from "@reduxjs/toolkit";
import axios from "@/utils/axios";
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
        if (hasPermission('product.view')) {
            menu.subMenu.push({
                id: 'subMenu04.2',
                title: 'Manage Products',
                icon: 'bi-bag-check-fill',
                url: '/settings/products',
                subSubMenu: []
            });
        }

        if (hasPermission('designation.view')) {
            menu.subMenu.push({
                id: 'subMenu04.2',
                title: 'Manage Designation',
                icon: 'bi-person-video3',
                url: '/settings/designations',
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
    axios.get('menu')
        .then(res => {
            dispatch({ type: Types.SIDEBAR_MENU_LIST, payload: res.data ?? [] });
        })
        .catch(error => {
            dispatch({ type: Types.SIDEBAR_MENU_LIST, payload: [] });
        });
}