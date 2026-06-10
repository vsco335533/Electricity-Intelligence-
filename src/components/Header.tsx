'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Bell, User, Settings, LayoutDashboard, Menu, X, Info } from 'lucide-react';
import styles from './Header.module.css';
import Link from 'next/link';

interface HeaderProps {
    user: string | null;
    onLogout: () => void;
}

export default function Header({ user, onLogout }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <Link href="/" className={styles.logoLink} onClick={() => setIsMenuOpen(false)}>
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className={styles.iconWrapper}
                    >
                        <Zap size={24} fill="var(--primary)" color="var(--primary)" />
                    </motion.div>
                    <span className={styles.logoText}>ENERGY<span className={styles.accent}>CORE</span></span>
                </Link>
            </div>

            <nav className={styles.nav}>
                <Link href="/" className={styles.navLink}><LayoutDashboard size={18} /> Dashboard</Link>
                <Link href="/alerts" className={styles.navLink}><Bell size={18} /> Alerts</Link>
                <Link href="/info" className={styles.navLink}><Info size={18} /> Info</Link>
                <Link href="/settings" className={styles.navLink}><Settings size={18} /> Settings</Link>
            </nav>

            <div className={styles.userSection}>
                <div className={styles.desktopUser}>
                    {user ? (
                        <div className={styles.profileBox}>
                            <div className={styles.userInfo}>
                                <span className={styles.userName}>{user}</span>
                                <span className={styles.userRole}>Administrator</span>
                            </div>
                            <button className={styles.logoutBtn} onClick={onLogout}>Logout</button>
                        </div>
                    ) : (
                        <div className={styles.authBtn}>Login Required</div>
                    )}
                </div>

                <button className={styles.mobileMenuBtn} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className={styles.mobileOverlay}
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        <div className={styles.mobileNav}>
                            <Link href="/" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
                                <LayoutDashboard size={24} /> Dashboard
                            </Link>
                            <Link href="/alerts" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
                                <Bell size={24} /> Alerts
                            </Link>
                            <Link href="/info" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
                                <Info size={24} /> Info
                            </Link>
                            <Link href="/settings" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
                                <Settings size={24} /> Settings
                            </Link>
                            <div className={styles.mobileUserSection}>
                                {user ? (
                                    <div className={styles.mobileProfile}>
                                        <div className={styles.mobileUserInfo}>
                                            <div className={styles.userName}>{user}</div>
                                            <div className={styles.userRole}>Security Principal</div>
                                        </div>
                                        <button className={styles.logoutBtn} onClick={() => { onLogout(); setIsMenuOpen(false); }}>
                                            Terminate Session
                                        </button>
                                    </div>
                                ) : (
                                    <div className={styles.authBtn}>Access Locked</div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
