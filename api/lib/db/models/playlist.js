import mongoose from 'mongoose';
import { toClient } from './utils.js';
import Video from './Video.js';

const schema = mongoose.Schema({
  name: String,
  items: [{
    type: mongoose.ObjectId,
    ref: Video.modelName
  }]
});

schema.method('toClient', toClient);

export default mongoose.model('Playlist', schema);
