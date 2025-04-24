'use client';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../firebase/config';
import Link from 'next/link';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const auth = getAuth(app); // Initialize Firebase Auth
        const db = getFirestore(app); // Initialize Firestore

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            // Successfully authenticated
            const user = userCredential.user;
            console.log('userCredential', userCredential);

            // 1. Get user name from Firebase Authentication (if available)
            const displayName = user.displayName;

            // If displayName is not set in Firebase Auth, try to fetch it from Firestore
            if (!displayName) {
                const userDocRef = doc(db, 'users', user.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    // Fetch name from Firestore if it exists
                    setUserName(userDocSnap.data().name);
                }
            } else {

                setUserName(displayName);
            }

            // Store user information (name and email) in a cookie
            document.cookie = `user=${encodeURIComponent(JSON.stringify({
                uid: user.uid,
                email: user.email,
                name: userName || displayName // Ensure name is saved, if available
            }))}; path=/; secure; samesite=strict`;

            console.log('Login successful, redirecting...');
            window.location.href = '/';
        } catch (err) {
            console.error('Error:', err.message);
            setError(err.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
                {userName && (
                    <p className="text-sm text-center text-gray-600">
                        Welcome, {userName}!
                    </p>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600">
                    Don&apos;t have an account? <Link href="signup" className="text-blue-500 hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
}