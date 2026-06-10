const { neon } = require('@neondatabase/serverless');
const fs = require('fs');

async function test() {
    const env = fs.readFileSync('.env.local', 'utf8');
    const match = env.match(/DATABASE_URL="?([^"\n]+)"?/);
    if (!match) {
        console.error("Could not find DATABASE_URL in .env.local");
        return;
    }
    const url = match[1];
    console.log("Testing connection...");
    const sql = neon(url);

    const start = Date.now();
    try {
        const result = await sql`SELECT 1 as test`;
        console.log(`Success! Result: ${JSON.stringify(result)}`);
        console.log(`Time taken: ${Date.now() - start}ms`);
    } catch (err) {
        console.error("Query failed after", Date.now() - start, "ms");
        console.error("Error Name:", err.name);
        console.error("Error Message:", err.message);
        if (err.sourceError) {
            console.error("Source Detail:", JSON.stringify(err.sourceError, null, 2));
        }
    }
}

test();
