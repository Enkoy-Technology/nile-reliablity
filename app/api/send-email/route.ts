import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, company, email, message } = body;

    // Validate required fields
    if (!name || !company || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Using FormSubmit - completely FREE, no API key needed!
    // It sends emails directly to the specified addresses
    const emailData = {
      name,
      company,
      email,
      message,
      _subject: `New Plant Audit Request from ${name} - ${company}`,
      _captcha: false,
      _template: 'table', // Nice table format
      _replyto: email, // Reply to the user's email
    };

    // Send to both email addresses simultaneously
    const emailPromises = [
    //   fetch('https://formsubmit.co/ajax/contact@getbet04@gmail.com', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json',
    //     },
    //     body: JSON.stringify(emailData),
    //   }),

    //   fetch('https://formsubmit.co/ajax/contact@nilereliability.com', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json',
    //     },
    //     body: JSON.stringify(emailData),
    //   }),
      fetch('https://formsubmit.co/ajax/biniyamcbm1@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(emailData),
      }),
    ];

    const responses = await Promise.all(emailPromises);

    // Check if emails were sent successfully
    const allSuccess = responses.every(response => response.ok);

    if (!allSuccess) {
      // If at least one succeeded, still show success
      const anySuccess = responses.some(response => response.ok);
      if (!anySuccess) {
        throw new Error('Failed to send email');
      }
    }

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}

