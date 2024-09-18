const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const clientRoutes = require('./routes/clientRoutes');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
mongoose.connect('mongodb://localhost/client_management', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/clients', clientRoutes);

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
