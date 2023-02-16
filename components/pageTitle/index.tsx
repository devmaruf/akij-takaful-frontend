interface propsType {
    title?: string;
}

export default function IPageTitle({ title = "Page Title" }: propsType) {
    return (
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 capitalize">{title}</h1>
    )
}