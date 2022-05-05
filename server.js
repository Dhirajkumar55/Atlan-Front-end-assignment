const jsonServer = require('json-server')
const cors = require('cors');
const server = jsonServer.create();
const Router = jsonServer.router('./json-server/db.json');
const middlewares = jsonServer.defaults({static:"./build"});
const port = 5000;

server.use(middlewares);
server.use(Router);
server.use(cors());

server.listen(process.env.PORT || 5000);