const testEmailAPI = async () => {
  try {
    const response = await fetch("/api/sendMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: "Test Email from JICC Church",
        html: "<h1>Test Email</h1><p>This is a test email to verify the API is working.</p>",
      }),
    });

    const data = await response.json();
    console.log("Response status:", response.status);
    console.log("Response data:", data);

    if (response.ok) {
      console.log("✅ Email API is working!");
    } else {
      console.log("❌ Email API failed:", data.error);
    }
  } catch (error) {
    console.log("❌ Error testing email API:", error.message);
  }
};

// Run the test
testEmailAPI();
