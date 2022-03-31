import 'dotenv/config';
import mongoose from 'mongoose';

const connection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to %s', process.env.MONGO_URI);
    })
    .catch(err => {
      console.error('App starting error:', err.message);
      process.exit(1);
    });
};
export default connection;
