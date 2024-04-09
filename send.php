<?php
// Set the recipient email address
$to = "lethabolesheleba2003@gmail.com";

// Set the email subject
$subject = "Test Email";

// Set the email message
$message = "Hello, This is a test email from PHP.";

// Set the email headers
$headers = "From: sender@example.com" . "\r\n" .
    "Reply-To: sender@example.com" . "\r\n" .
    "X-Mailer: PHP/" . phpversion();

// Send the email
if (mail($to, $subject, $message, $headers)) {
    echo "Email sent successfully!";
} else {
    echo "Email sending failed.";
}
?>