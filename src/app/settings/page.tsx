'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Settings, User, Database, Globe, Bell, Shield } from 'lucide-react';
import styles from '@/components/Dashboard.module.css';

export default function SettingsPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Control Center
                </motion.h1>
                <p>System Configuration & User Preferences</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>
                {/* Profile Settings */}
                <motion.div
                    className={styles.glassCard}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h2 className={styles.title}><User size={20} color="var(--primary)" /> Profile Configuration</h2>
                    <div style={{ display: 'grid', gap: '20px', maxWidth: '500px' }}>
                        <div className={styles.formGroup}>
                            <label>Consumer Name</label>
                            <input type="text" className={styles.input} defaultValue="MUSHAM RAJKUMAR" />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Primary Email</label>
                            <input type="email" className={styles.input} defaultValue="raj@admin.dev" />
                        </div>
                    </div>
                </motion.div>

                {/* System Settings */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                    <motion.div
                        className={styles.glassCard}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h2 className={styles.title}><Database size={20} color="var(--secondary)" /> Data Storage</h2>
                        <div style={{ color: '#888', fontSize: '0.9rem' }}>
                            <p>Database: <strong>Neon PostgreSQL</strong></p>
                            <p>Region: <strong>US-East-1 (AWS)</strong></p>
                            <p style={{ marginTop: '10px' }}>All billing history is securely synced with your Cloud vault.</p>
                        </div>
                        <button className={styles.button} style={{ marginTop: '20px', background: 'rgba(255,255,255,0.05)' }}>Optimize Cache</button>
                    </motion.div>

                    <motion.div
                        className={styles.glassCard}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className={styles.title}><Globe size={20} color="#00ff00" /> Regionality</h2>
                        <div style={{ color: '#888', fontSize: '0.9rem' }}>
                            <p>Timezone: <strong>IST (+5:30)</strong></p>
                            <p>Currency: <strong>INR (₹)</strong></p>
                            <p>Utility Provider: <strong>TGSPDCL</strong></p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
