const form = document.getElementById('eth_wallet_frm');

function generateReferralCode() {
    // Generate a random string for the referral code
    let referralCode = Math.random().toString(36).substring(2, 8); // Adjust length as needed

    // Update the URL with the new referral code
    let currentURL = new URL(window.location.href);

    currentURL.searchParams.set("ref", referralCode);

    document.getElementById("referral-link").textContent = currentURL.href;

    // Redirect to the updated URL
    console.log(currentURL.href);
  }


form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission
  
    try {
      const ethAddress = document.getElementById("eth-address").value.trim();
  
      if (ethAddress === "") {
        alert("Please enter a correct BEP20 wallet address");
        return; // Exit the function if ethAddress is empty
      }
  
      console.log("Fetched ethAddress:", ethAddress); // Log the retrieved address
  
      const response = await fetch("/route/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ethAddress,
        }),
      });
  
      if (response.ok) {
        // alert("Check your email for registration details");
  
        // Update the UI as needed
            var userPanel = document.getElementById("user-panel");
            var loginForm = document.getElementById("login-form");
            var ethAddressDisplay = document.getElementById("eth-address-display");

            // If ethAddress is not empty, update the DOM elements and perform additional actions
            userPanel.style.display = "block";
            loginForm.style.display = "none";
            ethAddressDisplay.textContent = ethAddress;

            // Call a function to generate a referral code
            generateReferralCode();
      } else {
        console.error("Error sending email:", await response.json()); // Log the error details
        throw new Error('Failed to send email');
      }
    } catch (err) {
      console.error("Error in email.js:", err); // Log any errors in client-side handling
      alert('An error occurred. Please try again later.');
    }
  });


