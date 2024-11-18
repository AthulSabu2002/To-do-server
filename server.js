require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDb = require('./config/connectDb');
const todoRoutes = require('./routes/todos');

const app = express();
const PORT = 5000;


app.use(express.json());
app.use(cors());


app.use('/api/todos', todoRoutes);


connectDb();



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
