export const generateDropdownList = (data: any[]) => {
    let options: any[] = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                value: item.id,
                label: item.name,
            };
            options.push(itemData);
        });
    }
    return options;
};

export const productModesDropdown = [
    {
        label: 'Yearly',
        value: 'yearly',
    },
    {
        label: 'Half-Yearly',
        value: 'half_yearly',
    },
    {
        label: 'Quarterky',
        value: 'quarterly',
    },
    {
        label: 'Single',
        value: 'single',
    },
    {
        label: 'Monthly',
        value: 'monthly',
    }
];