import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
    {
        path: '/',
        title: 'Inicio',
    },
    {
        path: '/galery',
        title: 'Galería',
    },
    {
        path: '/love',
        title: 'Carta',
    }
];

export const NavBar = () => {
    const { pathname } = useLocation();
    const [currentPath, setCurrentPath] = useState(pathname);

    useEffect(() => {
        setCurrentPath(pathname);
    }, [pathname]);

    return (
        <div style={{zIndex: '9999'}} className='flex p-1 bottom-0 justify-center min-h-[64px] items-center fixed w-full'>
            <nav className="flex flex-row p-1 rounded-full px-6 bg-[#171717] border border-neutral-600 lg:bg-[#121212]/80 lg:backdrop-blur-xl text-gray-300 md:w-[full]">
                <div className="flex flex-row transition-all items-center justify-center w-full xl:w-[80%] min-w-[300px]">
                    <ol className="flex space-x-1">
                        {links.map((link, index) => (
                            <Link
                                key={index}
                                to={link.path}
                                className={`flex items-center justify-center min-w-[100px] hover:cursor-pointer border-b border-b-transparent hover:border-b-white p-2 rounded-sm ${currentPath === link.path ? 'text-green-500' : ''}`}
                            >
                                {link.title}
                            </Link>
                        ))}
                    </ol>
                </div>
            </nav>
        </div>
    );
};
