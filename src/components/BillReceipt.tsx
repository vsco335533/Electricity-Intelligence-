'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Printer, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { format } from 'date-fns';
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
                        <div className={styles.logo}>TELANGANA</div>
                        <div className={styles.logo}>TGSPDCL</div>
                        <div className={styles.subHeader}>LT-ELECTRICITY BILL CUM NOTICE</div>
                        <div className={styles.billMeta}>
                            <span>Dt: {format(new Date(), 'dd/MM/yyyy')}</span>
                            <span>Time: {format(new Date(), 'HH:mm')}</span>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <span className={styles.sectionTitle}>Consumer Details :</span>
                        <div className={styles.row}>
                            <span className={styles.label}>SC No:</span>
                            <span className={styles.value}>0909 26558</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>USC No:</span>
                            <span className={styles.value}>115453841</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>Name:</span>
                            <span className={styles.value}>{bill.consumer_name || 'MUSHAM RAJKUMAR'}</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>Addr:</span>
                            <span className={styles.value}>PLOT NO.67/PART PRAGATOOLS COLONY GAJULARAMARAM</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>Mobile:</span>
                            <span className={styles.value}>7780164447</span>
                        </div>
                    </div>

                    <div className={styles.gridSection}>
                        <div className={styles.gridRow}>
                            <span>Cat: 1B(2) Domestic</span>
                            <span>Ph: 1</span>
                        </div>
                        <div className={styles.gridRow}>
                            <span>Contracted Load:</span>
                            <span>2.00 KW</span>
                        </div>
                        <div className={styles.gridRow}>
                            <span>Meter No:</span>
                            <span>HE260122549131(IR)</span>
                        </div>
                    </div>

                    <div className={styles.readingSection}>
                        <div className={styles.readingHeader}>
                            <span>Reading</span>
                            <span>Date</span>
                            <span>KWh</span>
                        </div>
                        <div className={styles.readingRow}>
                            <span>Present</span>
                            <span>{format(new Date(), 'dd/MM/yy')}</span>
                            <span>{bill.curr_reading}</span>
                        </div>
                        <div className={styles.readingRow}>
                            <span>Previous</span>
                            <span>{format(new Date(new Date().setMonth(new Date().getMonth() - 1)), 'dd/MM/yy')}</span>
                            <span>{bill.prev_reading}</span>
                        </div>
                        <div className={styles.readingRow} style={{ borderTop: '1px dashed #000', marginTop: '5px', paddingTop: '5px' }}>
                            <span>Units: <strong>{bill.units}</strong></span>
                            <span>Days: 31</span>
                        </div>
                    </div>

                    <div className={styles.chargesSection}>
                        <div className={styles.row}><span>Energy Charges</span><span>{Number(bill.energy_charges).toFixed(2)}</span></div>
                        <div className={styles.row}><span>Fixed Charges</span><span>{Number(bill.fixed_charges).toFixed(2)}</span></div>
                        <div className={styles.row}><span>Customer Charges</span><span>{Number(bill.customer_charges).toFixed(2)}</span></div>
                        <div className={styles.row}><span>Electricity Duty</span><span>{Number(bill.electricity_duty).toFixed(2)}</span></div>
                        <div className={styles.row}><span>Interest on ED</span><span>0.00</span></div>
                        <div className={styles.row}><span>Tax / Surcharge</span><span>0.00</span></div>
                        <div className={styles.row} style={{ fontWeight: 'bold', borderTop: '1px solid #000', paddingTop: '5px' }}>
                            <span>Bill Amount</span><span>{Number(bill.total_amount).toFixed(2)}</span>
                        </div>
                    </div>

                    <div className={styles.totalSection}>
                        <div className={styles.totalDue}>
                            <span>Total Due</span>
                            <span>₹ {Number(bill.total_amount).toFixed(2)}</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>Due Date</span>
                            <span className={styles.value}>19-Jun-2026</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>Disconn Date</span>
                            <span className={styles.value}>03-Jul-2026</span>
                        </div>
                    </div>

                    <div className={styles.footer}>
                        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>TOLL FREE: 1912</div>
                        <div>tgouthernpower.org</div>
                        <div style={{ fontSize: '0.6rem', marginTop: '10px' }}>Powered by Bharat Smart Services</div>
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
