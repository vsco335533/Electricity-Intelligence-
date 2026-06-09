'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bell, AlertTriangle, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import styles from '@/components/Dashboard.module.css';

const alerts = [
    {
        id: 1,
        title: "Unusual Consumption Peak",
        desc: "Energy usage increased by 40% yesterday between 6:00 PM and 10:00 PM.",
        type: "warning",
        time: "2 hours ago"
    },
    {
        id: 2,
        title: "System Maintenance",
        desc: "TGSPDCL grid optimization scheduled for June 12th. Local backup recommended.",
        type: "info",
        time: "1 day ago"
    },
    {
        id: 3,
        title: "Voltage Stability Alert",
        desc: "Minor voltage fluctuation detected. System auto-compensated.",
        type: "success",
        time: "3 days ago"
    }
];

export default function AlertsPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Security & Alerts
                </motion.h1>
                <p>Real-time Grid Surveillance & Intelligence Notifications</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '20px' }}>
                {alerts.map((alert, i) => (
                    <motion.div
                        key={alert.id}
                        className={styles.glassCard}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        style={{ display: 'flex', gap: '20px', alignItems: 'center' }}
                    >
                        <div style={{
                            background: alert.type === 'warning' ? 'rgba(255, 170, 0, 0.1)' : 'rgba(0, 242, 255, 0.1)',
                            padding: '15px',
                            borderRadius: '15px',
                            display: 'flex'
                        }}>
                            {alert.type === 'warning' ? <AlertTriangle color="#ffaa00" /> : <Bell color="var(--primary)" />}
                        </div>

                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                <h3 style={{ fontSize: '1.1rem' }}>{alert.title}</h3>
                                <span style={{ fontSize: '0.75rem', color: '#666' }}>{alert.time}</span>
                            </div>
                            <p style={{ color: '#888', fontSize: '0.9rem' }}>{alert.desc}</p>
                        </div>

                        <button className={styles.iconBtn}>
                            <ArrowRight size={18} />
                        </button>
                    </motion.div>
                ))}
            </div>

            <motion.div
                className={styles.glassCard}
                style={{ marginTop: '40px', border: '1px solid var(--primary-glow)', background: 'rgba(0, 242, 255, 0.05)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <ShieldCheck color="var(--primary)" size={24} />
                    <div>
                        <h3 style={{ color: 'var(--primary)' }}>Grid Protection Active</h3>
                        <p style={{ fontSize: '0.85rem', color: '#666' }}>EnergyCore is currently monitoring 14 parameters of your local grid for safety and efficiency.</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
