const https = require('https');

https.get('https://google.com', (res) => {
    console.log('Google statusCode:', res.statusCode);
}).on('error', (e) => {
    console.error('Google error:', e);
});

https.get('https://ep-blue-firefly-aq32z5zv.c-8.us-east-1.aws.neon.tech', (res) => {
    console.log('Neon statusCode:', res.statusCode);
}).on('error', (e) => {
    console.error('Neon error:', e);
});
