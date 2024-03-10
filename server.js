const express = require('express');
const cors = require('cors');
const path = require('path');
const sendEmail = require('./route/send-email');
require('dotenv').config();

console.log(process.env);

const app = express();

app.use(express.json());

app.use(cors({
  origin: '*' // Allow all origins (not recommended in production)
}));

// Log incoming requests
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

app.use('/translate_a', express.static(path.resolve(__dirname, 'translate_a')));
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));
app.use('/route', express.static(path.resolve(__dirname, 'route')));
app.use('/npm', express.static(path.resolve(__dirname, 'npm')));
app.use('/releases', express.static(path.resolve(__dirname, 'releases')));

// Define the path to your HTML file
const filePath = path.resolve(__dirname, 'index.html');

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(filePath);
    console.log(`Sent response: HTML file sent`);
    console.log(filePath);
});

app.post('/route/send-email', async (req, res) => {
  try {
    // Log the entire request body for debugging
    console.log('Received request body:', req.body);
    
    // Log incoming ETH address
    console.log('Received ethAddress:', req.body.ethAddress);

    const { ethAddress } = req.body;
    const result = await sendEmail(ethAddress);

    // Log result before sending response
    console.log('Response to be sent:', result);

    res.status(200).send(result);
  } catch (error) {
    console.error('Error during email sending:', error);
    res.status(500).send("Failed to send email");
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
