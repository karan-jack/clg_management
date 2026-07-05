require('dotenv').config();
const app = require('./src/app');
const { sequelize } = require('./src/config/db');

const PORT = process.env.PORT || 5000;

// Test database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database Connected Successfully');

    // Import models/index.js to load all associations
    require('./src/models');

    // Start server after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server Running On Port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  });