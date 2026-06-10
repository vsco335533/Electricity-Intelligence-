const https = require('https');
https.get('https://github.com', (res) => {
    console.log('GitHub SUCCESS:', res.statusCode);
}).on('error', (e) => {
    console.log('GitHub FAIL:', e.message);
});
