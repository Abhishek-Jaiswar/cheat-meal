import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, User, Settings, LogOut } from 'lucide-react';

interface LinkType {
    title: string;
    path: string;
}

const links: LinkType[] = [
    { title: 'Home', path: '/' },
    { title: 'Advertise', path: '/advertise' },
    { title: 'Register Restaurants', path: '/register-restaurant' },
];

const Navbar: React.FC = () => {
    const [active, setActive] = useState<string>('Home');
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const cartRef = useRef<HTMLDivElement>(null);
    const isUserLoggedIn = true;

    const handleCartAction = () => {
        setIsCartOpen(true);
        setIsDropdownOpen(false);
    };

    const handleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
        setIsCartOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) ||
            (cartRef.current && !cartRef.current.contains(event.target as Node))
        ) {
            setIsDropdownOpen(false);
            setIsCartOpen(false);
        }
    };

    useEffect(() => {
        if (isDropdownOpen || isCartOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen, isCartOpen]);

    return (
        <nav className="bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <h1 className="text-2xl font-bold text-gray-900">CheatMeal</h1>
                    </div>
                    <div className="hidden md:flex items-center justify-center space-x-8">
                        <div className="flex space-x-4">
                            {links.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`${active === link.title
                                        ? 'border-b-2 border-blue-500 text-gray-900'
                                        : 'text-gray-500 hover:text-gray-900'
                                        } px-3 py-2 text-sm font-medium`}
                                    onClick={() => setActive(link.title)}
                                >
                                    {link.title}
                                </Link>
                            ))}
                        </div>
                        {isUserLoggedIn ? (
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <button
                                        onClick={handleCartAction}
                                        className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition duration-150 ease-in-out"
                                    >
                                        <ShoppingCart className="h-6 w-6" />
                                    </button>
                                    <AnimatePresence>
                                        {isCartOpen && (
                                            <motion.div
                                                ref={cartRef}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                                            >
                                                <div className="px-4 py-2 text-sm text-gray-700">Your cart is empty</div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <div className="relative">
                                    <button
                                        onClick={handleDropdown}
                                        className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
                                    >
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src="/restro-login.jpeg"
                                            alt="User avatar"
                                        />
                                    </button>
                                    <AnimatePresence>
                                        {isDropdownOpen && (
                                            <motion.div
                                                ref={dropdownRef}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                                            >
                                                <div className="px-4 py-2 text-sm text-gray-700">
                                                    <p className="font-medium">Username</p>
                                                </div>
                                                <Link
                                                    to="/profile"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    <User className="inline-block w-4 h-4 mr-2" />
                                                    Profile
                                                </Link>
                                                <Link
                                                    to="/settings"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    <Settings className="inline-block w-4 h-4 mr-2" />
                                                    Settings
                                                </Link>
                                                <button
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    onClick={() => {
                                                        // Add logout logic here
                                                        console.log('Logged out');
                                                    }}
                                                >
                                                    <LogOut className="inline-block w-4 h-4 mr-2" />
                                                    Logout
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    to="/login"
                                    className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="bg-blue-500 text-white hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Sign up
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMobileNavOpen ? (
                                <X className="block h-6 w-6" />
                            ) : (
                                <Menu className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isMobileNavOpen && (
                    <motion.div
                        initial={{ opacity: 0, }}
                        animate={{ opacity: 1, }}
                        exit={{ opacity: 0, }}
                        transition={{ duration: 0.3 }}
                        className="relative md:hidden h-[90vh] flex flex-col"
                    >
                        <div className="">
                            {links.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`${active === link.title
                                        ? 'text-neutral-600 font-semibold'
                                        : 'text-neutral-900'
                                        } block px-3 py-2 rounded-md text-base font-medium`}
                                    onClick={() => {
                                        setActive(link.title);
                                        setIsMobileNavOpen(false);
                                    }}
                                >
                                    {link.title}
                                </Link>
                            ))}
                        </div>
                        {isUserLoggedIn ? (
                            <div className="absolute bottom-0 w-full">
                                {isDropdownOpen ? (
                                    <div className="mb-10 w-1/2 bg-white border border-neutral-400 rounded-md">
                                        <Link
                                            to="/profile"
                                            className="block px-3 py-2 rounded-md text-base font-medium text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100 w-full text-start"
                                            onClick={() => setIsMobileNavOpen(false)}
                                        >
                                            Profile
                                        </Link>
                                        <Link
                                            to="/settings"
                                            className="block px-3 py-2 rounded-md text-base font-medium text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100 w-full text-start"
                                            onClick={() => setIsMobileNavOpen(false)}
                                        >
                                            Settings
                                        </Link>
                                        <button
                                            className="block px-3 py-2 rounded-md text-base font-medium text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100 w-full text-start"
                                            onClick={() => {
                                                // Add logout logic here
                                                console.log('Logged out');
                                                setIsMobileNavOpen(false);
                                            }}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                ) : ("")}

                                <div className="flex items-center px-2">
                                    <div
                                        onClick={handleDropdown}
                                        className="flex-shrink-0 cursor-pointer">
                                        <img
                                            className="h-10 w-10 rounded-full"
                                            src="/restro-login.jpeg"
                                            alt="User avatar"
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium leading-none text-neutral-700">Username</div>
                                        <div className="text-sm font-medium leading-none text-neutral-600">user@example.com</div>
                                    </div>
                                    <button

                                        className="ml-auto flex-shrink-0"
                                    >
                                        <span className="sr-only">View notifications</span>
                                        <ShoppingCart className="h-6 w-6 hover:text-neutral-900 font-bold" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="pt-4 pb-3 border-t border-gray-700">
                                <div className="flex items-center justify-center space-x-4">
                                    <Link
                                        to="/login"
                                        className="bg-gray-800 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                                        onClick={() => setIsMobileNavOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="bg-blue-500 text-white hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                                        onClick={() => setIsMobileNavOpen(false)}
                                    >
                                        Sign up
                                    </Link>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;