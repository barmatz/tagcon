import { Schema, model } from 'mongoose';
import { toClient } from './utils.js';

const schema = Schema({
  name: String,
  items: [{
    name: String,
    url: String
  }]
});

schema.method('toClient', toClient);

export default model('Playlist', schema);
