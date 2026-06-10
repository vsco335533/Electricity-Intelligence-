// Test raw HTTPS POST exactly as neon does it
const https = require('https');
const url = require('url');
const fs = require('fs');

const env = fs.readFileSync('.env.local', 'utf8');
const match = env.match(/DATABASE_URL="?([^"\n]+)"?/);
const connStr = match[1];
// neon() uses the endpoint as HTTP: https://<host>/sql/query  
const parsed = new url.URL(connStr);
const host = parsed.hostname;
const password = parsed.password;

const body = JSON.stringify({ query: 'SELECT 1', params: [] });

const options = {
    hostname: host,
    port: 443,
    path: '/sql/query',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Neon-Connection-String': connStr,
        'Content-Length': Buffer.byteLength(body)
    }
};

console.log('Direct HTTPS to:', host);
const start = Date.now();
const req = https.request(options, (res) => {
    let data = '';
    res.on('data', d => data += d);
    res.on('end', () => {
        console.log(`Status: ${res.statusCode} in ${Date.now() - start}ms`);
        console.log('Response:', data);
    });
});
req.on('error', (e) => {
    console.error(`Error after ${Date.now() - start}ms:`, e.message, e.code);
});
req.write(body);
req.end();
