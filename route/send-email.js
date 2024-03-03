// var nodemailer = require("nodemailer");

// // Create a transporter
// var transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//         user: "dvdogoba23@gmail.com",
//         pass: "vtxvbevlocjgbwxv",
//     },
// });

// // Define your mail options template
// var mailOptionsTemplate = {
//     from: "dvdogoba23@gmail.com",
//     to: "edyogoba23@gmail.com",
//     subject: "Sending Email using Node.js",
//     text: "That was easy!",
// };

// // Handle requests
// function sendEmail(req, res) {
//     // Retrieve the ethAddress value from the request body
//     const { ethAddress } = req.body;

//     // Customize mail options with ethAddress
//     var mailOptions = {
//         ...mailOptionsTemplate,
//         text: `Eth Address: ${ethAddress}`, // Modify the email body to include the ethAddress value
//     };

//     // Send mail
//     transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//             console.log(error);
//             res.status(500).send("Failed to send email");
//         } else {
//             console.log("Email sent: " + info.response);
//             res.status(200).send("Email sent successfully");
//         }
//     });
// }

// // Export the sendEmail function for use in other modules
// module.exports = sendEmail;


const router = require("express").Router();

const [send, get] = require('../controller/emailControlller')

router.post('/sent/user', send);
router.post('get/user', get);

module.exports = router;