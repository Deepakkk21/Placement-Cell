const mongoose = require('mongoose');
const mongodb = require('mongodb');

// const dbURL ="mongodb://127.0.0.1:27017/Placement_cell";
const dbURL="mongodb+srv://dk135781:Deepak2110@reports.xribfnh.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});
