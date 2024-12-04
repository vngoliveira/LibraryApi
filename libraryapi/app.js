const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const loanRoutes = require('./routes/loanRoutes');
const reportRoutes = require('./routes/reportRoutes');
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/books', bookRoutes);
app.use('/users', userRoutes);
app.use('/loans', loanRoutes);
app.use('/reports', reportRoutes);

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synchronized');
    app.listen(3000, () => console.log('Server running on port 3000'));
  } catch (err) {
    console.error('Error connecting to database', err);
  }
})();
