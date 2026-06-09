import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET() {
  try {
    // Ensure table exists with all required columns
    await sql`
      CREATE TABLE IF NOT EXISTS electricity_bills (
        id SERIAL PRIMARY KEY,
        meter_type TEXT NOT NULL,
        bill_month TEXT NOT NULL,
        prev_reading INTEGER NOT NULL,
        curr_reading INTEGER NOT NULL,
        units INTEGER NOT NULL,
        energy_charges DECIMAL(10,2) NOT NULL,
        fixed_charges DECIMAL(10,2) NOT NULL,
        customer_charges DECIMAL(10,2) NOT NULL,
        electricity_duty DECIMAL(10,2) NOT NULL,
        total_amount DECIMAL(10,2) NOT NULL,
        category TEXT,
        usc_no TEXT,
        consumer_name TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Ensure columns exist (for existing tables)
    await sql`ALTER TABLE electricity_bills ADD COLUMN IF NOT EXISTS category TEXT;`;
    await sql`ALTER TABLE electricity_bills ADD COLUMN IF NOT EXISTS usc_no TEXT;`;
    await sql`ALTER TABLE electricity_bills ADD COLUMN IF NOT EXISTS consumer_name TEXT;`;

    const bills = await sql`SELECT * FROM electricity_bills ORDER BY created_at DESC`;
    return NextResponse.json(bills);
  } catch (error: any) {
    console.error('Database error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const {
      meter_type,
      bill_month,
      prev_reading,
      curr_reading,
      units,
      energy_charges,
      fixed_charges,
      customer_charges,
      electricity_duty,
      total_amount,
      category,
      usc_no,
      consumer_name
    } = data;

    const result = await sql`
      INSERT INTO electricity_bills (
        meter_type, bill_month, prev_reading, curr_reading, units, 
        energy_charges, fixed_charges, customer_charges, electricity_duty, total_amount,
        category, usc_no, consumer_name
      ) VALUES (
        ${meter_type}, ${bill_month}, ${prev_reading}, ${curr_reading}, ${units}, 
        ${energy_charges}, ${fixed_charges}, ${customer_charges}, ${electricity_duty}, ${total_amount},
        ${category || 'LT Cat-I'}, ${usc_no || '115453839'}, ${consumer_name || 'MUSHAM RAJKUMAR'}
      ) RETURNING *
    `;

    return NextResponse.json(result[0]);
  } catch (error: any) {
    console.error('Database error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
