/**
 * checkAllPermissionIsChecked
 *
 * Check if total checked permission length in this group = total permissions in this group ? isChecked = true : isChecked = false
 */
export const checkAllPermissionIsChecked = (roles: any[], permissionGroupIndex: number) => {
    const getTotalPermissions = roles[permissionGroupIndex].permissions;
    const getTotalCheckedPermissions = getTotalPermissions.filter(x => x.isChecked);
    return getTotalPermissions.length === getTotalCheckedPermissions.length ? true : false;
}
