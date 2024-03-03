const express = require('express');
const appRoute = require("./route/send-email");
// const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 5000; // Use environment variable for port

app.use(express.json());

// routes 
app.use('/api', appRoute);

// // Create a transporter using a secure method like OAuth2 or app passwords
// const transporter = nodemailer.createTransport({
//     service: 'gmail', // Replace with your email service provider
//     auth: {
//         user: "dvdogoba23@gmail.com",
//         pass: "vtxvbevlocjgbwxv",
//     }
// });

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html'); // Serve the index.html file
// });

// app.post('/send-email', async (req, res) => {
//     const { messageValue } = req.body; // Extract the value from the request body

//     try {
//         const mailOptions = {
//             from: 'Your Name <your_email@example.com>', // Replace with your name and email
//             to: 'recipient_email@example.com', // Replace with the recipient's email
//             subject: 'Email from Your Website',
//             text: `This email contains the following value: ${messageValue}`,
//             html: `<b>This email contains the following value:</b> ${messageValue}` // Consider using HTML for richer formatting
//         };

//         await transporter.sendMail(mailOptions);
//         res.json({ message: 'Email sent successfully!' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Failed to send email' });
//     }
// });

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
