import { Schema, ObjectId, model } from 'mongoose';
import { toClient } from './utils.js';
import Video from './Video.js';

const schema = Schema({
  name: String,
  items: [{
    type: ObjectId,
    ref: Video.modelName
  }]
});

schema.method('toClient', toClient);

export default model('Playlist', schema);
