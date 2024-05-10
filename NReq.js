const http = require('http');
const https = require('https');

const NReq = {
    request: (method, protocol, host, path, payload, headers) => {
        const options = { method, headers };

        const req = (protocol === 'https' ? https : http).request(
            { ...options, host, path },
            (res) => {
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    console.log('Result:', data);
                });
            }
        );

        req.on('error', (error) => {
            console.error('Request error:', error);
        });

        if (payload) {
            req.write(payload);
        }

        req.end();
    },

    // Add other HTTP request methods as needed

};

module.exports = NReq;
