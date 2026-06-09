'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import styles from './Login.module.css';

export default function LoginPage() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Hardcoded credentials as requested
        const validIdentifiers = ['raj@admin.dev', 'rajkumar'];
        const validPassword = 'Raj@2025';

        setTimeout(() => {
            if (validIdentifiers.includes(identifier) && password === validPassword) {
                localStorage.setItem('energy_auth', 'true');
                localStorage.setItem('energy_user', identifier === 'rajkumar' ? 'Raj Kumar' : 'Admin Raj');
                window.location.href = '/';
            } else {
                setError('Invalid credentials. Access denied.');
                setLoading(false);
            }
        }, 1500);
    };

    return (
        <div className={styles.page}>
            {/* Decorative Orbs */}
            <motion.div
                animate={{
                    y: [0, -30, 0],
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className={styles.orb1}
            />

            <motion.div
                className={styles.loginCard}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className={styles.header}>
                    <div className={styles.logoIcon}>
                        <Zap fill="var(--primary)" color="var(--primary)" size={32} />
                    </div>
                    <h1>Access Terminal</h1>
                    <p>Login to EnergyCore Intelligence Systems</p>
                </div>

                <form onSubmit={handleLogin} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label><Mail size={16} /> Identity</label>
                        <input
                            type="text"
                            placeholder="Email or Username"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label><Lock size={16} /> Security Key</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.error}>{error}</motion.div>}

                    <button type="submit" className={styles.loginBtn} disabled={loading}>
                        {loading ? 'Authenticating...' : (
                            <>Enter System <ArrowRight size={18} /></>
                        )}
                    </button>
                </form>

                <div className={styles.footer}>
                    <ShieldCheck size={14} /> End-to-End Encrypted System
                </div>
            </motion.div>
        </div>
    );
}
