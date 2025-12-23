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

    // Get Google Apps Script Web App URL from environment variable
    // If not set, use a placeholder that user needs to replace
    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL || 'YOUR_GOOGLE_SCRIPT_URL_HERE';

    if (googleScriptUrl === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
      console.error('Google Script URL is not configured');
      return NextResponse.json(
        { error: 'Form submission service is not configured. Please contact the administrator.' },
        { status: 500 }
      );
    }

    // Prepare data for Google Sheets
    const timestamp = new Date().toISOString();
    const formData = {
      timestamp,
      name,
      company,
      email,
      message,
    };

    // Send to Google Apps Script
    const response = await fetch(googleScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Script error:', response.status, errorText);
      throw new Error(`Failed to submit form: ${response.status}`);
    }

    const result = await response.json();
    console.log('Form submitted successfully to Google Sheets:', result);

    return NextResponse.json(
      { message: 'Form submitted successfully!', result },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json(
      {
        error: 'Failed to submit form. Please try again or contact us directly.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

