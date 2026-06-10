const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

async function test() {
    const url = process.env.DATABASE_URL;
    console.log("Using URL:", url.substring(0, 20) + "...");
    const sql = neon(url);

    console.log("Attempting query...");
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
            console.error("Source Error Cause:", err.sourceError.cause);
        }
    }
}

test();
