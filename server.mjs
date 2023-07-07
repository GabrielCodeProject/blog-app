import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// API routes
app.get('/api', (req, res) => {
    res.json({ message: 'API is working!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
