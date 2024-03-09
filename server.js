const express = require('express');
const cors = require('cors');
const sendEmail = require('./route/send-email');

const app = express();

app.use(express.json());

app.use(cors({
  origin: '*' // Allow all origins (not recommended in production)
}));

// Log incoming requests
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  console.log(`Sent request: ${res.method} ${req.url}`)
  next();
});

app.use(express.static('portaldrop'));

app.get('/', (req, res) => {
  console.log(path.resolve(__dirname, 'portaldrop', 'index.html'))
  res.sendFile(path.resolve(__dirname, 'portaldrop', 'index.html'));
});

app.post('/send-email', async (req, res) => {
  try {
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
