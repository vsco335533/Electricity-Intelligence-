'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Info, ShieldAlert, Phone, MapPin, ExternalLink } from 'lucide-react';
import styles from '@/components/Dashboard.module.css';

export default function InfoPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Tariff & Utility Intelligence
                </motion.h1>
                <p>Official TGSPDCL Slab Rates & Consumer Information</p>
            </header>

            <div className={styles.contentLayout}>

                {/* Domestic Slab Rates */}
                <motion.div
                    className={styles.glassCard}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h2 className={styles.title}><Info size={20} color="var(--primary)" /> LT Cat-I: Domestic</h2>

                    <div className={styles.tableWrapper}>
                        <table className={styles.historyTable}>
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Units/Month</th>
                                    <th>Rate (Rs/Unit)</th>
                                    <th>Fixed (Rs/kW)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Cat-I(A)</td>
                                    <td>0 - 50</td>
                                    <td>1.95</td>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <td>Cat-I(A)</td>
                                    <td>51 - 100</td>
                                    <td>3.10</td>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <td>Cat-I(B)(i)</td>
                                    <td>0 - 100</td>
                                    <td>3.40</td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>Cat-I(B)(i)</td>
                                    <td>101 - 200</td>
                                    <td>4.80</td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>Cat-I(B)(ii)</td>
                                    <td>0 - 200</td>
                                    <td>5.10</td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>Cat-I(B)(ii)</td>
                                    <td>201 - 300</td>
                                    <td>7.70</td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>Cat-I(B)(ii)</td>
                                    <td>301 - 400</td>
                                    <td>9.00</td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>Cat-I(B)(ii)</td>
                                    <td>401 - 800</td>
                                    <td>9.50</td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>Cat-I(B)(ii)</td>
                                    <td>Above 800</td>
                                    <td>10.00</td>
                                    <td>50</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Commercial Slab Rates */}
                <motion.div
                    className={styles.glassCard}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h2 className={styles.title}><Info size={20} color="var(--primary)" /> LT Cat-II: Commercial</h2>
                    <div className={styles.tableWrapper}>
                        <table className={styles.historyTable}>
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Units/Month</th>
                                    <th>Rate (Rs/Unit)</th>
                                    <th>Fixed (Rs/kW)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>Cat-II(A)</td><td>Upto 50</td><td>7.00</td><td>30</td></tr>
                                <tr><td>Cat-II(B)</td><td>0 - 100</td><td>8.50</td><td>70/100</td></tr>
                                <tr><td>Cat-II(B)</td><td>101 - 300</td><td>9.90</td><td>70/100</td></tr>
                                <tr><td>Cat-II(B)</td><td>301 - 500</td><td>10.40</td><td>70/100</td></tr>
                                <tr><td>Cat-II(B)</td><td>Above 500</td><td>11.00</td><td>100</td></tr>
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Commercial & Others */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                    <motion.div
                        className={styles.glassCard}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <h2 className={styles.title}><ShieldAlert size={20} color="var(--secondary)" /> Minimum Charges</h2>
                        <div style={{ fontSize: '0.85rem', color: '#888' }}>
                            <p><strong>LT Cat-I(A):</strong> Nil</p>
                            <p><strong>LT Cat-II(A):</strong> 50 Single Phase / 100 Three Phase</p>
                            <p><strong>LT Cat-II(C):</strong> 300 (Advertisement Hoardings)</p>
                            <p>Effective from: 01.11.2024</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className={styles.glassCard}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <h2 className={styles.title}><Phone size={20} color="#00ff00" /> Helpline & Circles</h2>
                        <div style={{ fontSize: '0.85rem', color: '#888' }}>
                            <p><strong>Grievance Forum:</strong> Erragadda, Hyd</p>
                            <p><strong>Phone:</strong> 040-23431431</p>
                            <p><strong>Circles:</strong> MBNR, NGKL, WNP, GDW, NLG, YDD, SRPT, MDK, SDPT, SNRD</p>
                            <p style={{ marginTop: '10px' }}><ExternalLink size={14} /> TGSPDCL Customer Care: 1912</p>
                        </div>
                    </motion.div>
                </div>

                {/* Footer info link */}
                <div style={{ textAlign: 'center', opacity: 0.5, fontSize: '0.8rem' }}>
                    <MapPin size={12} /> Southern Power Distribution Company of Telangana Ltd.
                </div>
            </div>
        </div>
    );
}
