# EmailJS Setup Guide

This guide will help you set up EmailJS to receive form submissions via email - **NO BACKEND NEEDED!**

## Step 1: Sign Up for EmailJS

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click **"Sign Up"** and create a free account
3. The free plan includes **200 emails per month**

## Step 2: Add an Email Service

1. In your EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (Recommended - easiest)
   - **Outlook**
   - **Yahoo**
   - **Custom SMTP** (for other providers)
4. Follow the connection steps for your chosen provider
5. **Copy the Service ID** (you'll need this later)
   - Your Service ID: `service_ec60cuq`

## Step 3: Create an Email Template

1. Go to **"Email Templates"** in your dashboard
2. Click **"Create New Template"**
3. Choose **"Blank Template"** (we'll use a custom design)
4. Copy the template from `EMAILJS_TEMPLATE.html` file in this project, or use these settings:

### Template Settings

**Subject:**

```
New Plant Audit Request from {{from_name}} - {{company}}
```

**Email Body (HTML):**

Copy the HTML code from the `EMAILJS_TEMPLATE.html` file in your project, or use this:

```html
<div style="font-family: system-ui, sans-serif, Arial; font-size: 12px">
  <div>Nile Reliability: New Request from {{from_name}} - {{company}}</div>

  <div
    style="
      margin-top: 20px;
      padding: 15px 0;
      border-width: 1px 0;
      border-style: dashed;
      border-color: lightgrey;
    "
  >
    <table role="presentation">
      <tr>
        <td style="vertical-align: top">
          <div
            style="
              padding: 6px 10px;
              margin: 0 10px;
              background-color: aliceblue;
              border-radius: 5px;
              font-size: 26px;
            "
            role="img"
          >
            👤
          </div>
        </td>
        <td style="vertical-align: top">
          <div style="color: #2c3e50; font-size: 16px">
            <strong>{{from_name}}</strong>
          </div>
          <div style="color: #cccccc; font-size: 13px">{{time}}</div>
          <div style="color: #666; font-size: 14px; margin: 8px 0">
            <strong>Company:</strong> {{company}}
          </div>
          <div style="color: #666; font-size: 14px; margin: 8px 0">
            <strong>Email:</strong> <a href="mailto:{{from_email}}" style="color: #3498db">{{from_email}}</a>
          </div>
          <p style="font-size: 16px; margin-top: 15px; white-space: pre-wrap;">{{message}}</p>
        </td>
      </tr>
    </table>
  </div>
</div>
```

**Email Body (Plain Text):**

```
New Plant Audit Request

Name: {{from_name}}
Company: {{company}}
Email: {{from_email}}
Time: {{time}}

Message:
{{message}}

---
This email was sent from the Nile Reliability website contact form.
```

5. Set **"To Email"** to: `biniyamcbm1@gmail.com`
6. Set **"From Name"** to: `{{from_name}}`
7. Set **"Reply To"** to: `{{from_email}}`
8. Click **"Save"**
9. **Copy the Template ID** (you'll need this later)

## Step 4: Get Your Public Key

1. Go to **"Account"** > **"General"**
2. Find **"Public Key"** (it starts with something like `user_xxxxx`)
3. **Copy the Public Key** (you'll need this later)

## Step 5: Add Environment Variables

1. Create or update `.env.local` in your project root
2. Add these three lines:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

3. Replace the values with:
   - `your_service_id_here` → Your Service ID from Step 2
   - `your_template_id_here` → Your Template ID from Step 3
   - `your_public_key_here` → Your Public Key from Step 4

## Step 6: Restart Your Development Server

1. Stop your server (Ctrl+C)
2. Run `npm run dev` again
3. The environment variables will now be loaded

## Step 7: Test It

1. Fill out the contact form on your website
2. Submit it
3. Check `biniyamcbm1@gmail.com` - you should receive the email!

## Troubleshooting

- **Not receiving emails?**
  - Check your spam/junk folder
  - Verify all three environment variables are set correctly
  - Check the browser console for errors
  - Make sure you restarted your dev server after adding env variables

- **"EmailJS is not configured" error?**
  - Make sure your `.env.local` file has all three variables
  - Make sure they start with `NEXT_PUBLIC_`
  - Restart your development server

- **Want to change the recipient email?**
  - Go to EmailJS dashboard > Email Templates
  - Edit your template
  - Change "To Email" field
  - Save

## Removing the EmailJS Watermark

The "Email sent via EmailJS.com" watermark appears on the **free tier only**. To remove it:

1. **Upgrade to a paid plan** (Starter $15/mo or higher) - This completely removes the watermark
2. The template includes CSS to try hiding it, but this may not work on all email clients since EmailJS injects it after sending

**Note:** The watermark is only visible in the email content, not in the sender information.

## Pricing

- **Free**: 200 emails/month (includes watermark)
- **Starter ($15/mo)**: 1,000 emails/month (no watermark)
- **Business ($35/mo)**: 5,000 emails/month (no watermark)

That's it! Your form will now send beautiful, professional emails using EmailJS! 🎉
