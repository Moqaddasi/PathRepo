"use client";
import logo from '../../assets/logo.png';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function NavBar() {
    const [userName, setUserName] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const userCookie = document.cookie.split('; ').find(row => row.startsWith('user='));
        if (userCookie) {
            const userValue = decodeURIComponent(userCookie.split('=')[1]);
            const userObject = JSON.parse(userValue);
            setUserName(userObject.name);
            console.log('User Name:', userObject.name);
        }

        // Close mobile menu when window is resized to desktop size
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Toggle mobile menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-gray-50 border-b border-gray-200 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and desktop navigation */}
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0">
                            <Image
                                src={logo}
                                alt="Logo"
                                width={60}
                                height={60}
                                className="w-auto h-10 sm:h-12"
                                priority
                            />
                        </Link>
                        <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                            <Link href="/" className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
                                Home
                            </Link>
                            <Link href="/archMenu" className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
                                Architecture
                            </Link>
                            <Link href="/repoFileExplorer" className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
                                Repository Explorer
                            </Link>
                        </div>
                    </div>

                    {/* User section and mobile menu button */}
                    <div className="flex items-center">
                        <div className="hidden md:block">
                            {userName.length ? (
                                <p className="text-rose-800 font-medium">{`Hello ${userName}`}</p>
                            ) : (
                                <Link href="/login" className="px-4 py-2 text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
                                    Login
                                </Link>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center ml-4">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                                onClick={toggleMenu}
                            >
                                <span className="sr-only">Open main menu</span>
                                {/* Hamburger icon */}
                                {!isMenuOpen ? (
                                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                ) : (
                                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu, toggle classes based on menu state */}
            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
                    <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-600">
                        Home
                    </Link>
                    <Link href="/archMenu" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-600">
                        Architecture
                    </Link>
                    <Link href="/repoFileExplorer" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-600">
                        Repository Explorer
                    </Link>
                    {/* Show login link in mobile menu if user is not logged in */}
                    {!userName.length && (
                        <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-600">
                            Login
                        </Link>
                    )}
                    {/* Show user greeting in mobile menu if logged in */}
                    {userName.length > 0 && (
                        <div className="px-3 py-2 text-rose-800 font-medium">
                            {`Hello ${userName}`}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}