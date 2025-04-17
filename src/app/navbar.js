"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function NavBar() {
    const [userName, setUserName] = useState('');
    React.useEffect(() => {
        const userCookie = document.cookie.split('; ').find(row => row.startsWith('user='));
        if (userCookie) {
            const userValue = decodeURIComponent(userCookie.split('=')[1]);
            const userObject = JSON.parse(userValue);
            setUserName(userObject.name);
            console.log('User Name:', userObject.name);
        }
    }, []);
    return (
        <nav style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", background: "#f5f5f5", borderBottom: "1px solid #ddd" }}>
            <Link href="/">
                <Image
                    src="/logo.png"
                    alt="Logo"
                    width={40}
                    height={40}
                    priority
                />
            </Link>
            <Link href="/" style={{ textDecoration: "none", color: "#000", fontWeight: "bold" }}>Home</Link>
            <Link href='archMenu' className='text-black'>Arch</Link>
            <Link href='repoFileExplorer' className='text-black'>Repo File Explorer</Link>
            {userName.length ?

                <>

                    <p className='text-black'>{`Hello ${userName}`}</p>
                    <Link href='/createArch' style={{ textDecoration: "none", color: "#000", fontWeight: "bold" }}>create Arch</Link>

                </>

                :

                <Link href='/login' style={{ textDecoration: "none", color: "#000", fontWeight: "bold" }}>Login</Link>
            }
        </nav>
    )
}