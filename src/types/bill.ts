export interface Bill {
    id?: number;
    meter_type: string;
    bill_month: string;
    prev_reading: number;
    curr_reading: number;
    units: number;
    energy_charges: number;
    fixed_charges: number;
    customer_charges: number;
    electricity_duty: number;
    total_amount: number;
    category?: string;
    usc_no?: string;
    consumer_name?: string;
    created_at?: string;
}

export type MeterType = 'watchmen' | 'penthouse';
