// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
// const { sequelize } = require('./src/models');
const authRoutes = require('./src/routes/authRoutes');

const app = express();


// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Sync Sequelize models with the database
// sequelize.sync().then(() => {
//   console.log('Database synced');
// });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
