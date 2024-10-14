const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./models/userModel').sequelize;
const userRoutes = require('./routes/userRoutes');

dotenv.config();
const app = express();
app.use(express.json());

sequelize.sync().then(() => {
    console.log('Database connected');
});

app.use('/api/users', userRoutes);

app.listen(3001, () => {
    console.log('User Service is running on port 3001');
});
