export enum Role {
    sudo = 'Altyapı Yöneticisi',
    admin = 'Yönetici',
    manager = 'Yetkili',
    operator = 'Operatör',
    cashier = 'Kasiyer',
    contributor = 'Katkıcı'
}

export const RoleGroups = {
    administration: new Set([Role.sudo, Role.admin]),
    addingPayment: new Set([Role.sudo, Role.admin, Role.cashier]),
    panelAccess: new Set([Role.sudo, Role.admin, Role.cashier]),
};

export const hasRole = (userRole: string, roleGroup: keyof typeof RoleGroups): boolean => {
    const roleValue = Role[userRole as keyof typeof Role];
    return RoleGroups[roleGroup].has(roleValue);
};