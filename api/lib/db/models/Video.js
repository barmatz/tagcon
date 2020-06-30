import mongoose from 'mongoose';
import findOrCreate from 'mongoose-findorcreate';
import { toClient } from './utils.js';

const schema = mongoose.Schema({
  name: String,
  url: String,
  tags: [{
	  label: String,
	  timestamp: {
	    start: Number,
	    end: Number
	  }
  }]
});

schema.plugin(findOrCreate);
schema.method('toClient', toClient);

export default mongoose.model('Video', schema);
