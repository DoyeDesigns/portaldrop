const form = document.getElementById('eth_wallet_frm');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(form); // Get form data
    const messageValue = formData.get('addressValue');

    try {
        // Send an AJAX request to the server-side route
        const response = await fetch('/send-email', {
            method: 'POST',
            body: JSON.stringify({ messageValue }), // Send data as JSON
            headers: {
                'Content-Type': 'application/json' // Set content type header
            }
        });

        const data = await response.json();

        if (data.message === 'Email sent successfully!') {
            alert('Email sent successfully!'); // Display success message
            form.reset(); // Reset the form for a new submission
        } else {
            alert('Failed to send email. Please try again.'); // Display error message
        }
    } catch (error) {
        console.error(error);
        alert('An error occurred. Please try again latersss.'); // Display generic error message
    }
});