'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Printer, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import styles from './BillReceipt.module.css';
import { Bill } from '@/types/bill';

interface BillReceiptProps {
    bill: Bill;
    onClose: () => void;
}

export default function BillReceipt({ bill, onClose }: BillReceiptProps) {
    const receiptRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = async () => {
        if (!receiptRef.current) return;

        const canvas = await html2canvas(receiptRef.current, {
            scale: 2,
            logging: false,
            useCORS: true
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [canvas.width / 2, canvas.height / 2]
        });

        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
        pdf.save(`TGSPDCL_Bill_${bill.bill_month}_${bill.meter_type}.pdf`);
    };

    return (
        <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
            <motion.div
                className={styles.modalContent}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
            >
                <div className={styles.modalHeader}>
                    <h3 style={{ margin: 0, fontSize: '1rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>Bill Preview</h3>
                    <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
                        <X size={24} color="#111" />
                    </button>
                </div>

                <div id="official-bill" ref={receiptRef} className={styles.billContainer}>
                    <div className={styles.header}>
                        <div className={styles.logo}>TGSPDCL</div>
                        <div className={styles.subHeader}>Telangana State Southern Power Distribution Co. Ltd.</div>
                        <div style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>ELECTRITIY BILL CUM NOTICE</div>
                    </div>

                    <div className={styles.section}>
                        <span className={styles.sectionTitle}>Consumer Info</span>
                        <div className={styles.row}>
                            <span className={styles.label}>Consumer Name:</span>
                            <span className={styles.value}>{bill.consumer_name || 'MUSHAM RAJKUMAR'}</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>USC Number:</span>
                            <span className={styles.value}>{bill.usc_no || '115453839'}</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>Meter Type:</span>
                            <span className={styles.value}>{bill.meter_type.toUpperCase()}</span>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <span className={styles.sectionTitle}>Billing Details</span>
                        <div className={styles.row}>
                            <span className={styles.label}>Billing Month:</span>
                            <span className={styles.value}>{bill.bill_month}</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>Readings:</span>
                            <span className={styles.value}>{bill.prev_reading} TO {bill.curr_reading}</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>Total Units:</span>
                            <span className={styles.value}>{bill.units} kWh</span>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <span className={styles.sectionTitle}>Charge Breakdown</span>
                        <div className={styles.row}>
                            <span className={styles.label}>Energy Charges:</span>
                            <span className={styles.value}>₹ {Number(bill.energy_charges).toFixed(2)}</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>Fixed Charges:</span>
                            <span className={styles.value}>₹ {Number(bill.fixed_charges).toFixed(2)}</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>Customer Charges:</span>
                            <span className={styles.value}>₹ {Number(bill.customer_charges).toFixed(2)}</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>Electricity Duty:</span>
                            <span className={styles.value}>₹ {Number(bill.electricity_duty).toFixed(2)}</span>
                        </div>
                    </div>

                    <div className={styles.totalRow}>
                        <span>TOTAL AMOUNT:</span>
                        <span>₹ {Number(bill.total_amount).toFixed(2)}</span>
                    </div>

                    <div className={styles.footer}>
                        <div className={styles.qrCode}>SCAN FOR PAYMENT</div>
                        <p>This is a computer generated document.</p>
                        <p>Southern Power Dist. Company of Telangana Ltd.</p>
                        <p>Regd. Office: 6-1-50, Mint Compound, Hyderabad-500063</p>
                    </div>
                </div>

                <div className={styles.actionButtons}>
                    <button className={styles.printBtn} onClick={handlePrint}>
                        <Printer size={18} /> Print Bill
                    </button>
                    <button className={styles.downloadBtn} onClick={handleDownload}>
                        <Download size={18} /> Download PDF
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
