import debug from 'debug';
import http from 'http';
import app from './app.js';
import { normalizePort } from './utils.js';

const { NODE_ENV, PORT } = process.env
    , debugLog = debug('api:server')
    , port = normalizePort(PORT || '3000');

app.set('port', port);

const server = http.createServer(app);

function isTestEnv() {
  return NODE_ENV === 'test';
}

function handleServerError(err) {
  if (isTestEnv()) {
    throw err;
  } else {
    console.error(err);
    process.exit(1);
  }
}

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
        handleServerError(`${bind} requires elevated privileges`);
        break;
      case 'EADDRINUSE':
        handleServerError(`${bind} is already in use`);
        break;
      default:
        throw error;
    }
  })
  .on('listening', () => {
    const addr = server.address()
        , bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;

    debugLog(`Listening on ${bind}`);

    if (!isTestEnv()) {
      console.log(`Listening on ${bind}`);
    }
  });

export const connect = () => server.listen(port);

export const disconnect = () => server.close();
