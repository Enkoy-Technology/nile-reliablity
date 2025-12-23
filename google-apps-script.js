/**
 * Google Apps Script for Nile Reliability Contact Form
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com
 * 2. Click "New Project"
 * 3. Delete the default code and paste this entire script
 * 4. Create a new Google Sheet (or use an existing one)
 * 5. In the first row, add these headers: Timestamp, Name, Company, Email, Message, Status
 * 6. Copy the Sheet ID from the URL (the long string between /d/ and /edit)
 * 7. Replace 'YOUR_SHEET_ID_HERE' below with your actual Sheet ID
 * 8. Click "Deploy" > "New deployment"
 * 9. Select type: "Web app"
 * 10. Execute as: "Me"
 * 11. Who has access: "Anyone"
 * 12. Click "Deploy"
 * 13. Copy the Web App URL and add it to your .env.local as GOOGLE_SCRIPT_URL
 */

function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);

    // Replace 'YOUR_SHEET_ID_HERE' with your actual Google Sheet ID
    const SHEET_ID = '1x0taoXzPCDJ6UWn_BXhcIJa1y1MkILVM1t9Xet6osr0';
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();

    // Append the data to the sheet with default status "New"
    sheet.appendRow([
      data.timestamp || new Date(),
      data.name || '',
      data.company || '',
      data.email || '',
      data.message || '',
      'New' // Default status for new submissions
    ]);

    // Send email notification - REQUIRED
    try {
      const emailSubject = `New Plant Audit Request from ${data.name} - ${data.company}`;
      const emailBody = `
New Plant Audit Request

Name: ${data.name}
Company: ${data.company}
Email: ${data.email}

Message:
${data.message}

---
Submitted: ${data.timestamp || new Date()}
      `;

      const emailHtmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0f172a; border-bottom: 2px solid #0f172a; padding-bottom: 10px;">
            New Plant Audit Request
          </h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Company:</strong> ${data.company}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            <p><strong>Submitted:</strong> ${data.timestamp || new Date()}</p>
          </div>
          <div style="margin: 20px 0;">
            <h3 style="color: #0f172a;">Message:</h3>
            <p style="background-color: #ffffff; padding: 15px; border-left: 4px solid #0f172a; white-space: pre-wrap;">
              ${String(data.message || '').replace(/\n/g, '<br>')}
            </p>
          </div>
          <p style="color: #64748b; font-size: 12px; margin-top: 30px;">
            This email was sent from the Nile Reliability website contact form.
          </p>
        </div>
      `;

      MailApp.sendEmail({
        to: 'biniyamcbm1@gmail.com',
        subject: emailSubject,
        htmlBody: emailHtmlBody,
        body: emailBody,
        replyTo: data.email || 'noreply@nilereliability.com'
      });

      Logger.log('Email sent successfully to biniyamcbm1@gmail.com');
    } catch (emailError) {
      // Log the error but don't fail the entire request
      Logger.log('ERROR: Email notification failed:', emailError.toString());
      // Still return success so the form submission doesn't fail
      // But log the error for debugging
    }

    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Form submitted successfully'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function (optional - you can run this to test)
function test() {
  const testData = {
    timestamp: new Date().toISOString(),
    name: 'Test User',
    company: 'Test Company',
    email: 'test@example.com',
    message: 'This is a test message'
  };

  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };

  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

