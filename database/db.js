import mongoose from 'mongoose';

const mongoUri = 'mongodb://localhost:27017/thesmellycats';

export default async function connectToDb() {
  if (mongoose.connection.readyState >= 1) return;

  mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  });
}
