export interface IPageContentProps {
    children: React.ReactNode;
}

export function PageContent({ children }: IPageContentProps) {
    return (
        <div className="px-5">
            <div className="my-3 p-4 rounded-md shadow-md bg-white">
                {children}
            </div>
        </div>
    );
}
