const { neon, neonConfig } = require('@neondatabase/serverless');
const fetch = require('node-fetch');
const fs = require('fs');

neonConfig.fetch = (i, n) => fetch(i, n);

async function test() {
    const env = fs.readFileSync('.env.local', 'utf8');
    const match = env.match(/DATABASE_URL="?([^"\n]+)"?/);
    const url = match[1];

    console.log("Testing with neonConfig.fetch = node-fetch...");
    const sql = neon(url);

    const start = Date.now();
    try {
        const result = await sql`SELECT 1 as test`;
        console.log(`Success! Result: ${JSON.stringify(result)}`);
        console.log(`Time taken: ${Date.now() - start}ms`);
    } catch (err) {
        console.error("Query failed after", Date.now() - start, "ms");
        console.error("Error Detail:", err);
    }
}

test();
