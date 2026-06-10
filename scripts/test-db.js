const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

async function test() {
    const sql = neon(process.env.DATABASE_URL);
    console.log("Testing connection to:", process.env.DATABASE_URL.split('@')[1]);
    try {
        const result = await sql`SELECT NOW()`;
        console.log("Success! Database time:", result[0].now);
    } catch (err) {
        console.error("Connection failed:", err);
    }
}

test();
