const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const connectMongo = require('./providers/mongoProvider');


connectMongo();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('Server is running!');
});

const urlRoutes = require('./routes/urlRoutes');
app.use('/', urlRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app; 