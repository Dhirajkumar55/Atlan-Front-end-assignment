const jsonServer = require('json-server')

const server = jsonServer.create();
const Router = jsonServer.router('./json-server/db.json');
const middlewares = jsonServer.defaults({static:"./build"});
const port = 3000;

server.use(middlewares);
server.use(Router)

server.listen(port);