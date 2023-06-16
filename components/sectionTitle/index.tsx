interface ISectionTitle {
    title: string;
    variant?: string;
    customClass?: string;
}

export default function SectionTitle({ title = "Title", variant = "primary", customClass = "" }: ISectionTitle) {

    return (
        <h3
            className={`
             focus:ring-4 transition font-medium rounded-sm text-md px-3 py-2.5 hover:opacity-90 mb-3
            ${variant === 'default' ? 'text-black' : 'text-white'} 
            ${variant === 'primary' ? 'bg-cyan-700' : ''} 
            ${variant === 'danger' ? 'bg-red-600' : ''} 
            ${variant === 'default' ? 'bg-slate-200' : ''} 
            ${variant === 'success' ? 'bg-green-500' : ''} 
            ${customClass}
            `}
        >
            {title}
        </h3>
    )
}