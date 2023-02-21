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