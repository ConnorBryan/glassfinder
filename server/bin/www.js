const http = require('http');
const app = require('../index');

const port = parseInt(process.env.PORT, 10) || 6166;

app.set('port', port);

const server = http.createServer(app);

server.listen(port);
