import debug from 'debug';
import http from 'http';
import app from './app.js';
import { normalizePort } from './utils.js';

const debugLog = debug('api:server')
    , port = normalizePort(process.env.PORT || '3000');

app.set('port', port);

const server = http.createServer(app);

server
  .on('error', error => {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof port === 'string'
      ? `Pipe ${port}`
      : `Port ${port}`;

    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  })
  .on('listening', () => {
    const addr = server.address()
        , bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;

    debugLog(`Listening on ${bind}`);

    if (process.env.NODE_ENV !== 'test') {
      console.log(`Listening on ${bind}`);
    }
  });

export const connect = async () => await server.listen(port);

export const disconnect = async () => await server.close();

export default server;
