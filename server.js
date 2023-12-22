const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/database');
const userRoute = require('./routes/userRoute');

require('dotenv').config();
require('colors');

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define your API routes with a root path
app.use('/api/users', userRoute);

// Error handling for 404 routes
app.use('*', (req, res) => {
  console.log('Endpoint working fine');
  res.status(404).send('Endpoint does not exist');
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


const PORT = process.env.PORT || 4000;



app.listen(
  PORT,
  console.log(`Server is connected ${process.env.NODE_ENV} mode on port ${PORT}`.yellow)
);

