require('dotenv').config();

// Mongo
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

// CORS
const cors = require('cors');
// Express
const express = require('express');

// Routes
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);


const port = 5200;

app.listen(port, () => console.log('Server running on port', port))