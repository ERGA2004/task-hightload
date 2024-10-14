const express = require('express');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes');
const sequelize = require('./models/taskModel').sequelize;
const { graphqlHTTP } = require('express-graphql');
const taskSchema = require('./graphql/schema');

dotenv.config();
const app = express();
app.use(express.json());

sequelize.sync().then(() => {
    console.log('Database connected');
});

app.use('/api/tasks', taskRoutes);
app.use('/graphql', graphqlHTTP({
    schema: taskSchema,
    graphiql: true
}));

app.listen(3002, () => {
    console.log('Task Service is running on port 3002');
});
