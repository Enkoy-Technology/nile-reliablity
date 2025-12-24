# Google Sheets Form Setup Guide

This guide will help you set up Google Sheets to receive form submissions from your website - **NO API KEYS NEEDED!**

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Nile Reliability Contact Form Submissions"
4. In the first row (Row 1), add these headers:
   - **Column A**: Timestamp
   - **Column B**: Name
   - **Column C**: Company
   - **Column D**: Email
   - **Column E**: Message
   - **Column F**: Status

## Step 2: Get Your Sheet ID

1. Look at the URL of your Google Sheet
2. It will look like: `https://docs.google.com/spreadsheets/d/1x0taoXzPCDJ6UWn_BXhcIJa1y1MkILVM1t9Xet6osr0/edit`
3. Copy the part between `/d/` and `/edit` - that's your Sheet ID

## Step 3: Set Up Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click **"New Project"**
3. Delete all the default code
4. Open the file `google-apps-script.js` in this project
5. Copy the entire contents and paste it into Google Apps Script
6. Find the line that says: `const SHEET_ID = 'YOUR_SHEET_ID_HERE';`
7. Replace `'YOUR_SHEET_ID_HERE'` with your actual Sheet ID (from Step 2)
8. Click **"Save"** (the floppy disk icon) and name your project "Nile Reliability Form Handler"

## Step 4: Deploy as Web App

1. Click **"Deploy"** > **"New deployment"**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **"Web app"**
4. Set these settings:
   - **Description**: "Nile Reliability Contact Form"
   - **Execute as**: "Me"
   - **Who has access**: **"Anyone"** (important!)
5. Click **"Deploy"**
6. **IMPORTANT FOR EMAIL NOTIFICATIONS:**
   - Click **"Authorize access"**
   - You'll see a warning - click **"Advanced"**
   - Click **"Go to [Your Project Name] (unsafe)"**
   - Sign in with your Google account
   - Click **"Allow"** to grant permissions for:
     - ✅ Send emails on your behalf
     - ✅ Access Google Sheets
   - **This is required for email notifications to work!**
7. **Copy the Web App URL** - it will look like: `https://script.google.com/macros/s/...`

## Step 5: Add URL to Your Website

1. Create a file called `.env.local` in your project root (if it doesn't exist)
2. Add this line:

   ```
   GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ACTUAL_URL_HERE/exec
   ```

3. Replace `YOUR_ACTUAL_URL_HERE` with the Web App URL you copied in Step 4
4. Make sure the URL ends with `/exec` (not `/dev`)
5. Restart your development server (`npm run dev`)

## Step 6: Set Up Status Dropdown (Optional but Recommended)

To easily track and update the status of each submission:

1. In your Google Sheet, select **Column F** (Status column)
2. Click **"Data"** > **"Data validation"**
3. Set these options:
   - **Criteria**: "List of items"
   - **Items**: `New, Contacted, Replied, In Progress, Closed, Not Interested`
   - ✅ Check "Show dropdown list in cell"
   - ✅ Check "Reject invalid data"
4. Click **"Save"**
5. Now you can click any cell in the Status column and select a status from the dropdown!

## Step 7: Test It

1. Fill out the contact form on your website
2. Submit it
3. Check your Google Sheet - you should see the new submission appear with status "New"!
4. You'll also receive an email notification at `contact@nilereliability.com`
5. Update the status as you work through each lead (e.g., "Contacted", "Replied", etc.)

## Optional: Color Code Status Column

For better visual tracking, you can add color coding to the Status column:

1. Select Column F (Status)
2. Click **"Format"** > **"Conditional formatting"**
3. Add rules like:
   - **"New"** → Yellow background
   - **"Contacted"** → Blue background
   - **"Replied"** → Green background
   - **"Closed"** → Gray background
   - **"Not Interested"** → Red background

## Updating Existing Sheets

If you already have a sheet with submissions and want to add the Status column:

1. Add a new column F with header "Status"
2. For existing rows, manually set their status (or leave blank)
3. New submissions will automatically get "New" status
4. Update your Google Apps Script with the new code (it now includes Status)

## Optional: Email Notifications

The script automatically sends email notifications. If you want to change the email address:

1. Open your Google Apps Script
2. Find the line: `to: 'contact@nilereliability.com',`
3. Change it to your preferred email
4. Click "Deploy" > "Manage deployments" > "Edit" > "New version" > "Deploy"

## Troubleshooting

- **Form not submitting?** Check that your `.env.local` file has the correct URL
- **Data not appearing in sheet?** Make sure the Sheet ID is correct and the sheet headers match
- **Permission errors?** Make sure "Who has access" is set to "Anyone" when deploying
- **Not receiving emails?**
  - Make sure you authorized email permissions (Step 4, point 6)
  - Check your spam/junk folder (emails may go to spam initially)
  - Go to Google Apps Script > "Executions" tab to see if there are any errors
  - Make sure the email address in the script (`contact@nilereliability.com`) is correct
  - Try running the `test()` function in the script editor to test email sending
- **Need to update the script?** After making changes, click "Deploy" > "Manage deployments" > "Edit" > "New version" > "Deploy"

That's it! Your form will now save all submissions directly to Google Sheets. 🎉
