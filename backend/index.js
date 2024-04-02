const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
var cors = require('cors')
dotenv.config();

const app = express();

// Middleware
app.use(cors())
app.use(express.json());

// Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/data', require('./routes/dataRoutes'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(1111, () => {
      console.log('Server is running on port 1111');
    });
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));
