import { connect } from './lib/server.js';
import db from './lib/db/index.js';

console.log(`Starting API server in ${process.env.NODE_ENV} environment`);

console.log('Connect to database');

db.connect();

console.log('Open server');

connect();
