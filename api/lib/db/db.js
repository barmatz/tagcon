import mongoose from 'mongoose';
import config from 'config-yml';

const { database: { name, url }} = config.load(process.env.NODE_ENV);

function handleConnectionError(err) {
  console.log('Database error:');
  console.error(err);
}

export const connect = async () => {
  await mongoose.connect(url, {
	  dbName: name,
	  useUnifiedTopology: true,
    useNewUrlParser: true
  });

  mongoose.connection.on('error', handleConnectionError);
};

export const disconnect = async () => {
  mongoose.connection.removeListener('error', handleConnectionError);

  await mongoose.disconnect();
};

export const dropCollection = async collectionName => {
  const { db } = mongoose.connection;

  if (db.listCollections({ name: collectionName }).toArray().length > 0) {
    await db.dropCollection(collectionName);
  }
};

export default {
  connect,
  disconnect,
  dropCollection
};
