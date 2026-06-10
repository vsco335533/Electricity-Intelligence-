const https = require('https');
const fs = require('fs');

const env = fs.readFileSync('.env.local', 'utf8');
const match = env.match(/DATABASE_URL="postgresql:\/\/([^:]+):([^@]+)@([^/]+)\/([^?]+)/);
const [_, user, password, host, db] = match;

const data = JSON.stringify({
    query: 'SELECT NOW()',
});

const options = {
    hostname: host,
    port: 443,
    path: '/sql',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${password}`,
        'Content-Length': data.length,
    },
};

console.log('Sending manual HTTP POST to:', host);
const req = https.request(options, (res) => {
    console.log('Status Code:', res.statusCode);
    res.on('data', (d) => {
        process.stdout.write(d);
    });
});

req.on('error', (e) => {
    console.error('Request Error:', e.message);
});

req.write(data);
req.end();
