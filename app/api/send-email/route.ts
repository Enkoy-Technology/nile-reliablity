import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, company, email, message } = body;

    if (!name || !company || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailData = {
      name,
      company,
      email,
      message,
      _subject: `New Plant Audit Request from ${name} - ${company}`,
      _captcha: false,
      _template: 'table',
      _replyto: email,
    };

    const recipients = [
      'https://formsubmit.co/ajax/getbet04@gmail.com',
    ];

    const emailPromises = recipients.map((endpoint) =>
      fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(emailData),
      })
    );

    const responses = await Promise.all(emailPromises);
    const allSuccess = responses.every((response) => response.ok);
    const anySuccess = responses.some((response) => response.ok);

    if (!anySuccess) {
      throw new Error('Failed to send email');
    }

    // Even if one fails, return 200 to avoid blocking the user; log issues server-side.
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

