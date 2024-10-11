const mongoose = require('mongoose');
try {
  mongoose.connect(process.env.MONGO_URL, {
 useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true
 
  });
  
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
  
} catch (error) {

}
