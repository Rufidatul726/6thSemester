const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userController = require('./controller/user-controller.js');

const app = express();
const PORT = 5000;
const MONGODB_URI = 'mongodb+srv://mvcpattern:mvcpattern@cluster0.2h7xzud.mongodb.net/?retryWrites=true&w=majority';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

app.use('/api/users', userController);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
