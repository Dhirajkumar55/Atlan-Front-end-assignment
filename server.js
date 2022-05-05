import {create, router, rewriter, defaults} from 'json-server'

const server = create();
const Router = router('./json-server/db.json');
const middlewares = defaults({static:"./build"});
const port = 5000;

server.use(middlewares);
server.use(Router)

server.listen(port);