'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { usePathname, useRouter } from 'next/navigation';

export default function AppShell({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const isAuth = localStorage.getItem('energy_auth') === 'true';
        const userName = localStorage.getItem('energy_user');

        if (!isAuth && pathname !== '/login') {
            router.push('/login');
        } else if (isAuth) {
            setUser(userName);
        }
        setLoading(false);
    }, [pathname, router]);

    const handleLogout = () => {
        localStorage.removeItem('energy_auth');
        localStorage.removeItem('energy_user');
        setUser(null);
        router.push('/login');
    };

    if (loading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyItems: 'center', background: '#000' }}></div>;

    if (pathname === '/login') return <>{children}</>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header user={user} onLogout={handleLogout} />
            <main style={{ flex: 1 }}>
                {children}
            </main>
            <Footer />
        </div>
    );
}
