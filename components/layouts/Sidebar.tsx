import { getSidebarMenuList } from "@/redux/actions/global-action";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Sidebar() {
    const dispatch = useDispatch();
    const { isOpenSidebar, sideMenuList } = useSelector((state: RootState) => state.global);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    useEffect(() => {
        dispatch(getSidebarMenuList())
    }, [dispatch]);

    return (
        <aside id="sidebar" className={`fixed z-20 h-full top-0 left-0 pt-16 lg:flex flex-shrink-0 flex-col transition-width ease-in-out duration-300 ${isOpenSidebar || windowWidth > 1023 ? "w-64" : "w-0"}`} aria-label="Sidebar">
            <div className="relative flex-1 flex flex-col h-full min-h-0 border-r border-gray-200 bg-white pt-0">
                <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                    <div className="flex-1 px-3 bg-white divide-y space-y-1">
                        <ul className="space-y-2 pb-2">

                            <li>
                                <Link href="/" className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group">
                                    <svg className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" /><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" /></svg>
                                    <span className="ml-3">Dashboards</span>
                                </Link>
                            </li>
                            {
                                sideMenuList && sideMenuList.length > 0 && sideMenuList.map((menu, menuIndex) => (
                                    <SubMenuUI menu={menu} key={menuIndex + 1} />
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    )
}


const SubMenuUI = ({ menu }) => {
    const [toggleSubMenu, setToggleSubMenu] = useState(false);
    const { sideMenuList } = useSelector((state: RootState) => state.global);
    const [menuID, setMenuID] = useState(sideMenuList[0].id);

    const handleToggle = (key) =>{
        console.log("key", key)
        setToggleSubMenu(!toggleSubMenu);
        setMenuID(key.id);
    }

    return (
        <li>
            <button onClick={()=> handleToggle(menu)} type="button" className={`text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group w-full ${(menuID === menu.id && toggleSubMenu === true) ? 'bg-gray-100' : 'bg-white'}`}>
                <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
                <span className="text-left ml-3 whitespace-nowrap w-full">{menu.title}</span>

              {
                !toggleSubMenu ? 
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>  :
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M169.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L192 205.3 54.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg>

              } 
            </button>
            {
                <ul className={`text-base text-gray-900 font-normal rounded-lg p-2 group w-full ml-2 ${(toggleSubMenu === true && menuID === menu.id) ? 'block' : 'hidden'}`}>
                    {
                        menu.subMenu.map((subMenu, subMenuIndex) => (

                            <>
                                {
                                    subMenu.subSubMenu.length === 0 ?
                                        <li className="w-full" key={subMenuIndex + 1}>
                                            <Link href={subMenu.url} className="block transition hover:bg-gray-100 text-gray-900 font-normal text-sm p-2 rounded flex-1 ">
                                                <span>{subMenu.title}</span>
                                            </Link>
                                        </li> :
                                        <SubSubMenuUI subMenu={subMenu} key={subMenuIndex + 1} />
                                }
                            </>
                        )
                        )}
                </ul>
            }
        </li>
    )
}

const SubSubMenuUI = ({ subMenu }) => {
    const [isToggleSubSubMenu, setIsToggleSubSubMenu] = useState(false)
    return (
        <li className="w-full">
            <span className="block transition hover:bg-gray-100 text-gray-900 font-normal text-sm p-2 rounded flex-1" onClick={()=>setIsToggleSubSubMenu(!isToggleSubSubMenu)}>{subMenu.title}</span>
            <ul className={isToggleSubSubMenu ? 'block' : 'hidden'} >
                {
                    subMenu.subSubMenu.map((subSubMenu, subSubMenuIndex) => (
                        <li className="w-full" key={subSubMenuIndex + 1}>
                            <Link href={subSubMenu.url} className="ml-3 block transition hover:bg-gray-100 text-gray-900 font-normal text-sm p-2 rounded flex-1">
                                <span>{subSubMenu.title}</span>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </li>
    )
}