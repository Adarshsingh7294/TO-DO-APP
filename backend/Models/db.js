// 

const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN || 'mongodb://127.0.0.1:27017/auth-db';

mongoose.connect(mongo_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB Connected...');
})
.catch((err) => {
  console.error('MongoDB Connection Error:', err.message);
});
