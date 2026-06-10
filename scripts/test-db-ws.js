const { neonConfig, Pool } = require('@neondatabase/serverless');
const ws = require('ws');
const fs = require('fs');

if (typeof window === 'undefined') {
    neonConfig.webSocketConstructor = ws;
}

async function test() {
    const env = fs.readFileSync('.env.local', 'utf8');
    const match = env.match(/DATABASE_URL="?([^"\n]+)"?/);
    const url = match[1];

    console.log("Testing WebSocket connection...");
    const pool = new Pool({ connectionString: url });

    const start = Date.now();
    try {
        const result = await pool.query('SELECT 1 as test');
        console.log(`Success! Result: ${JSON.stringify(result.rows)}`);
        console.log(`Time taken: ${Date.now() - start}ms`);
    } catch (err) {
        console.error("Query failed after", Date.now() - start, "ms");
        console.error("Error:", err);
    } finally {
        await pool.end();
    }
}

test();
