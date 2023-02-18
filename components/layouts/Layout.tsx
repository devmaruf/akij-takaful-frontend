import React from 'react';
import SidebarMenu from './Sidebar';
import Footer from './Footer';
import Navbar from './Navbar';

interface ILayoutProps {
    children: React.ReactNode;
}

const Layout: React.FunctionComponent<ILayoutProps> = ({ children }) => {
    return <>
        <Navbar />
        <div className="flex overflow-hidden bg-white pt-16">
            <SidebarMenu />
            <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
                <main>
                    <div className=""></div>
                    <div style={{ minHeight: "75vh" }}>
                        {children}
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    </>;
};

export default Layout;
