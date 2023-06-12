//@ts-check
import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const schema = new Schema({
  user: { type: String, required: true, max: 100 },
  message: { type: String, required: true, max: 100 },
});

schema.plugin(mongoosePaginate);
export const messageModel = model('msgs', schema);
