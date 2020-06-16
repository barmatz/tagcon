import { MongoClient } from 'mongodb';
import config from 'config-yml';

const { NODE_ENV } = process.env
    , { database: { name, url }} = config.load(NODE_ENV);

let client, database;

export const isConnected = () => !!(client && client.isConnected());

function handleDatabaseClose(err) {
  console.log('Database closed', err && `with error ${err}`);
}

function handleDatabaseError(err) {
  console.log('Database error:');
  console.error(err);
}

function handleDatabaseReconnect() {
  console.log('Database reconnected');
}

function handleDatabaseTimeout(err) {
  console.log('Database timeout');
  console.error(err);
}

export const disconnect = async () => {
  if (database) {
    database
	    .removeListener('close', handleDatabaseClose)
	    .removeListener('error', handleDatabaseError)
	    .removeListener('reconnect', handleDatabaseReconnect)
	    .removeListener('timeout', handleDatabaseTimeout);
  }

  if (client) {
    await client.close();
  }
};

export const connect = async () => {
  if (isConnected()) {
    await disconnect();
  }

  client = await new MongoClient(url, { useUnifiedTopology: true }).connect();

  database = await client.db(name);

  database
    .on('close', handleDatabaseClose)
    .on('error', handleDatabaseError)
    .on('reconnect', handleDatabaseReconnect)
    .on('timeout', handleDatabaseTimeout);
};

async function keepAlive() {
  if (!isConnected()) {
    await connect();
  }
}

export const insert = async (collectionName, doc) => {
  await keepAlive();

  const collection = database.collection(collectionName);

  if (doc instanceof Array && doc.length > 1) {
    return collection.insertMany(doc);
  }

  return collection.insertOne(doc);
};

export const find = async (collectionName, query, findOne) => {
  await keepAlive();

  const collection = database.collection(collectionName);

  if (findOne) {
    return collection.findOne(query);
  }

  return collection.find(query || {}).toArray();
};

export const dumpCollection = async collectionName => {
  await keepAlive();

  return database.collection(collectionName).deleteMany({});
};
