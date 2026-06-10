'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Mail, Lock, ArrowRight, ShieldCheck, Crown, Shield, FlaskConical } from 'lucide-react';
import styles from './Login.module.css';

// Account definitions
const ACCOUNTS = [
    {
        identifiers: ['dev@energycore.sys'],
        password: 'Dev@2025',
        name: 'Dev Master',
        role: 'super_admin',
        roleLabel: 'Super Admin',
    },
    {
        identifiers: ['raj@admin.dev', 'rajkumar'],
        password: 'Raj@2025',
        name: 'Raj Kumar',
        role: 'admin',
        roleLabel: 'Admin',
    },
    {
        identifiers: ['test@guest.dev', 'testuser'],
        password: 'Test@2025',
        name: 'Test User',
        role: 'testing',
        roleLabel: 'Testing',
    },
];

export default function LoginPage() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        setTimeout(() => {
            const matched = ACCOUNTS.find(
                (acc) =>
                    acc.identifiers.includes(identifier.trim()) &&
                    password === acc.password
            );

            if (matched) {
                localStorage.setItem('energy_auth', 'true');
                localStorage.setItem('energy_user', matched.name);
                localStorage.setItem('energy_role', matched.role);
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

                {/* Access Tier Info */}
                <div style={{
                    marginTop: '20px',
                    display: 'flex',
                    gap: '8px',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }}>
                    <span style={{
                        display: 'flex', alignItems: 'center', gap: '5px',
                        background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.3)',
                        borderRadius: '20px', padding: '4px 12px', fontSize: '0.72rem', color: '#ffd700'
                    }}>
                        <Crown size={11} /> Super Admin
                    </span>
                    <span style={{
                        display: 'flex', alignItems: 'center', gap: '5px',
                        background: 'rgba(0,242,255,0.1)', border: '1px solid rgba(0,242,255,0.3)',
                        borderRadius: '20px', padding: '4px 12px', fontSize: '0.72rem', color: 'var(--primary)'
                    }}>
                        <Shield size={11} /> Admin
                    </span>
                    <span style={{
                        display: 'flex', alignItems: 'center', gap: '5px',
                        background: 'rgba(150,100,255,0.1)', border: '1px solid rgba(150,100,255,0.3)',
                        borderRadius: '20px', padding: '4px 12px', fontSize: '0.72rem', color: '#a78bfa'
                    }}>
                        <FlaskConical size={11} /> Testing
                    </span>
                </div>

                <div className={styles.footer}>
                    <ShieldCheck size={14} /> End-to-End Encrypted System
                </div>
            </motion.div>
        </div>
    );
}
