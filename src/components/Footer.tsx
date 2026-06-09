'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Mail, ExternalLink, Share2 } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.brand}>
                    <h3>ENERGY<span>CORE</span></h3>
                    <p>The Future of Grid Intelligence and Consumption Management.</p>
                </div>

                <div className={styles.links}>
                    <div className={styles.linkGroup}>
                        <h4>Platform</h4>
                        <ul>
                            <li>Dashboard</li>
                            <li>Realtime Monitoring</li>
                            <li>API Access</li>
                        </ul>
                    </div>
                    <div className={styles.linkGroup}>
                        <h4>Regulatory</h4>
                        <ul>
                            <li>TGSPDCL Policies</li>
                            <li>ERC India</li>
                            <li>Privacy Protocol</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.social}>
                    <div className={styles.socialIcons}>
                        <Globe size={20} />
                        <ExternalLink size={20} />
                        <Share2 size={20} />
                        <Mail size={20} />
                    </div>
                    <p>© 2026 EnergyCore Intelligence Systems. SECURED BY NEON.</p>
                </div>
            </div>
        </footer>
    );
}
