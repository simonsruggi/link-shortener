const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const urlRoutes = require('./routes/urlRoutes');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost/link-shortener', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/', urlRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});