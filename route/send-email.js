const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_EMAIL || 'dvdogoba23@gmail.com',
    pass: process.env.PASS_WORD || 'vtxvbevlocjgbwxv',
  },
});

// Define your mail options template
const mailOptionsTemplate = {
    from: process.env.USER_EMAIL || 'dvdogoba23@gmail.com',
    to: process.env.SEND_TO || 'dvdogoba23@gmail.com',
    subject: "Aevodrop ETH address",
    text: "That was easy!",
};

async function sendEmail(ethAddress) {
  console.log("Received ethAddress:", ethAddress); // Log the received address

  const mailOptions = {
    ...mailOptionsTemplate,
    text: `Eth Address: ${ethAddress}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return "Email sent successfully";
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
}

module.exports = sendEmail;