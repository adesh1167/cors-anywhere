const corsProxy = require('../lib/cors-anywhere');

// Initialize the proxy
const proxy = corsProxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: [],    // Remove the X-Requested-With requirement
    removeHeaders: ['cookie', 'cookie2'] // Optional: helps with security
});

export default function handler(req, res) {
    // Vercel gives us the full path in req.url
    // We strip the leading slash so cors-anywhere sees "https://example.com"
    req.url = req.url.replace(/^\//, '');
    
    proxy.emit('request', req, res);
}
