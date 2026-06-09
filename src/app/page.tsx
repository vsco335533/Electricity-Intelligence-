'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  History,
  TrendingUp,
  Zap,
  Calendar,
  ArrowRight,
  Download,
  Printer,
  ChevronDown,
  Eye
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { format } from 'date-fns';
import styles from '@/components/Dashboard.module.css';
import { Bill, MeterType } from '@/types/bill';
import BillReceipt from '@/components/BillReceipt';

// TGSPDCL Slab Logic
const calculateEnergy = (units: number) => {
  let energy = 0;
  let category = "";

  if (units <= 100) {
    category = "LT Cat-I(A)";
    energy = units <= 50
      ? units * 1.95
      : 50 * 1.95 + (units - 50) * 3.10;
  }
  else if (units <= 200) {
    category = "LT Cat-I(B)(i)";
    energy = units <= 100
      ? units * 3.40
      : 100 * 3.40 + (units - 100) * 4.80;
  }
  else {
    category = "LT Cat-I(B)(ii)";
    let remaining = units;

    let slab1 = Math.min(remaining, 200);
    energy += slab1 * 5.80;
    remaining -= slab1;

    if (remaining > 0) {
      let slab2 = Math.min(remaining, 100);
      energy += slab2 * 7.70;
      remaining -= slab2;
    }

    if (remaining > 0) {
      let slab3 = Math.min(remaining, 100);
      energy += slab3 * 9.00;
      remaining -= slab3;
    }

    if (remaining > 0) {
      energy += remaining * 9.50;
    }
  }

  return { energy, category };
};

export default function Dashboard() {
  const [meterType, setMeterType] = useState<MeterType>('watchmen');
  const [billMonth, setBillMonth] = useState(format(new Date(), 'yyyy-MM'));
  const [prevReading, setPrevReading] = useState<number>(0);
  const [currReading, setCurrReading] = useState<string>('');
  const [history, setHistory] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showBill, setShowBill] = useState(false);
  const [currentBill, setCurrentBill] = useState<Bill | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<Bill | null>(null);

  // Fetch History
  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/bills');
      const data = await res.json();
      if (Array.isArray(data)) {
        setHistory(data);

        // Auto-set previous reading from latest entry for this meter
        const filtered = data.filter((b: Bill) => b.meter_type === meterType);
        if (filtered.length > 0) {
          setPrevReading(filtered[0].curr_reading);
        } else {
          setPrevReading(0);
        }
      }
    } catch (error) {
      console.error('Failed to fetch history:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [meterType]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Remove any trailing whitespace and parse
    const rawVal = currReading.trim();
    if (!rawVal) return alert("Please enter current reading");
    
    const currVal = parseInt(rawVal);
    if (isNaN(currVal)) return alert("Please enter a valid numeric current reading");

    const units = currVal - prevReading;
    if (units < 0) return alert("Current reading cannot be less than previous");

    setSubmitting(true);

    const { energy, category } = calculateEnergy(units);
    const fixed = 10.32;
    const customer = 36.13;
    const duty = energy * 0.024;
    const total = energy + fixed + customer + duty;

    const newBill: Bill = {
      meter_type: meterType,
      bill_month: billMonth,
      prev_reading: prevReading,
      curr_reading: currVal,
      units,
      energy_charges: energy,
      fixed_charges: fixed,
      customer_charges: customer,
      electricity_duty: duty,
      total_amount: total,
      category,
      usc_no: '115453839',
      consumer_name: 'MUSHAM RAJKUMAR'
    };

    try {
      const res = await fetch('/api/bills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBill)
      });

      if (res.ok) {
        const savedBill = await res.json();
        setCurrentBill(savedBill);
        setShowBill(true);
        fetchHistory(); // Refresh
        setCurrReading('');
      } else {
        alert("Error saving bill to database");
      }
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const chartData = useMemo(() => {
    return [...history]
      .filter(b => b.meter_type === meterType)
      .reverse()
      .map(b => ({
        month: b.bill_month,
        amount: Number(b.total_amount),
        units: b.units
      }));
  }, [history, meterType]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Energy Intelligence
        </motion.h1>
        <p>Advanced Bill Management System • TGSPDCL</p>
      </header>

      {/* Left Column: Form */}
      <aside>
        <motion.div
          className={styles.glassCard}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className={styles.title}><Plus size={20} color="var(--primary)" /> New Reading</h2>

          <form onSubmit={handleGenerate}>
            <div className={styles.formGroup}>
              <label>Meter Point</label>
              <select
                className={styles.input}
                value={meterType}
                onChange={(e) => setMeterType(e.target.value as MeterType)}
              >
                <option value="watchmen">Watchmen Room</option>
                <option value="penthouse">Pent House</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Billing Month</label>
              <input
                type="month"
                className={styles.input}
                value={billMonth}
                onChange={(e) => setBillMonth(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Previous Reading</label>
              <input
                type="number"
                className={styles.input}
                value={prevReading}
                readOnly
                style={{ opacity: 0.6 }}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Current Reading</label>
              <input
                type="number"
                inputMode="numeric"
                className={styles.input}
                placeholder="Enter reading..."
                value={currReading}
                onChange={(e) => setCurrReading(e.target.value)}
                required
                style={{ color: '#ffffff' }}
              />
            </div>

            <button type="submit" className={styles.button} disabled={submitting}>
              {submitting ? 'Processing...' : 'Generate Intelligence'}
            </button>
          </form>
        </motion.div>

        {/* Current Bill Preview */}
        <AnimatePresence>
          {showBill && currentBill && (
            <motion.div
              className={`${styles.glassCard} ${styles.billPreview}`}
              style={{ marginTop: '20px' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <h3 className={styles.title}><Zap size={18} color="#FFD700" /> Recent Bill</h3>
              <div style={{ fontSize: '0.9rem', color: '#ccc', lineHeight: '1.8' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Units Consumed:</span>
                  <span className={styles.units}>{currentBill.units} kWh</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Total Amount:</span>
                  <span className={styles.amount}>₹ {Number(currentBill.total_amount).toFixed(2)}</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px', marginTop: '15px' }}>
                <button 
                  className={styles.button} 
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                  onClick={() => setSelectedRecord(currentBill)}
                >
                  <Eye size={18} /> View Official Bill
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </aside>

      {/* Right Column: charts & History */}
      <main>
        <motion.div
          className={styles.glassCard}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className={styles.title}><TrendingUp size={20} color="var(--secondary)" /> Consumption Trends</h2>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="month" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ background: '#111', border: '1px solid #333', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--primary)' }}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="var(--primary)"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorAmount)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          className={styles.glassCard}
          style={{ marginTop: '30px' }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className={styles.title}><History size={20} color="#fff" /> Billing History</h2>
          <div style={{ overflowX: 'auto' }}>
            <table className={styles.historyTable}>
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Meter</th>
                  <th>Readings</th>
                  <th>Units</th>
                  <th>Amount</th>
                  <th>Show</th>
                </tr>
              </thead>
              <tbody>
                {history.filter(b => b.meter_type === meterType).map((bill, i) => (
                  <motion.tr
                    key={bill.id || i}
                    className={styles.historyRow}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <td>{bill.bill_month}</td>
                    <td>{bill.meter_type}</td>
                    <td><span style={{ color: '#666' }}>{bill.prev_reading}</span> <ArrowRight size={12} /> {bill.curr_reading}</td>
                    <td className={styles.units}>{bill.units}</td>
                    <td className={styles.amount}>₹ {Number(bill.total_amount).toFixed(2)}</td>
                    <td>
                      <button 
                        className={styles.iconBtn} 
                        onClick={() => setSelectedRecord(bill)}
                        title="View Official Bill"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
                {loading && [1, 2, 3].map((n) => (
                  <tr key={n} style={{ opacity: 0.3 }}>
                    <td colSpan={6}><div className={styles.skeleton} style={{ height: '50px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}></div></td>
                  </tr>
                ))}
                {!loading && history.filter(b => b.meter_type === meterType).length === 0 && (
                  <tr><td colSpan={6} style={{ textAlign: 'center', padding: '40px' }}>No records found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>

      <AnimatePresence>
        {selectedRecord && (
          <BillReceipt bill={selectedRecord} onClose={() => setSelectedRecord(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
