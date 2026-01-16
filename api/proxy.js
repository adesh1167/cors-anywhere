const corsProxy = require('../lib/cors-anywhere');

const proxy = corsProxy.createServer({
    originWhitelist: [], 
    requireHeader: [],    
    removeHeaders: ['cookie', 'cookie2']
}); 

export default function handler(req, res) {
    // 1. Get the URL and remove the leading slash safely
    // This regex ensures we ONLY remove the first slash if it's the very first character
    let targetUrl = req.url.startsWith('/') ? req.url.substring(1) : req.url;

    // 2. Fix the "Double Slash" issue
    // Sometimes browsers/Vercel collapse // into / (e.g., https:/google.com)
    if (targetUrl.startsWith('http:/') && !targetUrl.startsWith('http://')) {
        targetUrl = targetUrl.replace('http:/', 'http://');
    } else if (targetUrl.startsWith('https:/') && !targetUrl.startsWith('https://')) {
        targetUrl = targetUrl.replace('https:/', 'https://');
    }

    // 3. Re-assign the cleaned URL back to the request object
    req.url = targetUrl;
    
    proxy.emit('request', req, res);
}
