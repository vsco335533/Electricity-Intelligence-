const { Pool, neonConfig } = require('@neondatabase/serverless');
const ws = require('ws');
const fs = require('fs');

neonConfig.webSocketConstructor = ws;

async function test() {
    const env = fs.readFileSync('.env.local', 'utf8');
    const match = env.match(/DATABASE_URL="?([^"\n]+)"?/);
    const url = match[1];

    // FORCE use a known working AWS IP from the DNS answer
    // We substitute the hostname in the connection string but keep the host header for SSL
    const workingIp = "52.1.58.3";
    const host = "ep-blue-firefly-aq32z5zv.c-8.us-east-1.aws.neon.tech";
    const forcedUrl = url.replace(host, workingIp);

    console.log("Forcing connection to IP:", workingIp);
    const pool = new Pool({
        connectionString: forcedUrl,
    });

    // We need to tell the bridge which host we want for SSL
    // But the serverless driver might not easily support SNI override in Pool
    // Let's try it anyway.

    const start = Date.now();
    try {
        const result = await pool.query('SELECT NOW()');
        console.log(`SUCCESS! Result: ${JSON.stringify(result.rows)}`);
    } catch (err) {
        console.error("FAIL:", err.message);
    } finally {
        await pool.end();
    }
}

test();
