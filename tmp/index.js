const mariadb = require('mariadb');
const http = require('http');
const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);
const dbUtils = require('./db_utils');
const routes = require('./routes');
const pool = dbUtils.pool;

(async () => {
    await dbUtils.resetDB();
    await dbUtils.populateDB();
})()

const server = http.createServer(async (req, res) => {
    console.log(req.method + ':' + req.url);
    if (req.url === '/') {
        const content = await readFile('./index.html', 'utf8');
        res.setHeader('Content-type', 'text/html');
        res.write(content);
        res.end();
    }
    if (req.url === '/style.css') {
        const content = await readFile('./style.css', 'utf8');
        res.setHeader('Content-type', 'text/html');
        res.write(content);
        res.end();
    }
    if (req.url === '/favicon.jpg'){
        var s = fs.createReadStream('./favicon.jpg');
        s.on('open', () => {
            res.setHeader('Content-type', 'image/jpeg');
            s.pipe(res);
        })
        s.on('error', () => {
            res.setHeader('Content-type', 'text/plain');
            res.statusCode = 404;
            res.end()
        })
    }
    if (req.url === '/ges' && req.method === 'GET') {
        await routes.getAllGes(res);
    }
    if (req.url === '/ges/add' && req.method === 'PUT') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString() });
        req.on('end', () => { routes.addSingleGes(body, res) });
        //await routes.addSingleGes(req, res);
    }
    if (RegExp('^/ges/\\d+').test(req.url) && req.method === 'GET') {
        let arr = req.url.split('/');
        let id = arr[arr.length - 1];
        routes.getSingleGes(res, id)
    }
    if (RegExp('^/ges/\\d+').test(req.url) && req.method === 'DELETE') {
        let arr = req.url.split('/');
        let id = arr[arr.length - 1];
        routes.deleteSingleGes(res, id)
    }
});

server.listen(port = 1234, () => {
    console.log('Server listenning on port 1234...');
});
