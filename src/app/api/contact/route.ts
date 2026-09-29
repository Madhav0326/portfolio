import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!email || !message) {
      return NextResponse.json(
        { success: false, message: 'Please provide both your email and a message.' },
        { status: 400 }
      );
    }

    const accessKey =
      process.env.WEB3FORMS_ACCESS_KEY ||
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
      'cf3e3cf3-46b5-4785-b7b6-b2b4a5b714dd';

    if (!accessKey || accessKey.trim() === '' || accessKey === 'YOUR_ACCESS_KEY_HERE') {
      return NextResponse.json(
        {
          success: false,
          needsKey: true,
          message:
            'Web3Forms access key is not configured in .env.local yet.',
        },
        { status: 503 }
      );
    }

    const origin = req.headers.get('origin') || req.headers.get('referer') || 'http://localhost:3000';
    const userAgent = req.headers.get('user-agent') || 'Mozilla/5.0';

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Origin: origin,
        Referer: origin,
        'User-Agent': userAgent,
      },
      body: JSON.stringify({
        access_key: accessKey.trim(),
        name: name || 'Recruiter / Visitor',
        email: email.trim(),
        message: message.trim(),
        from_name: `${name || 'Portfolio Visitor'} via Portfolio`,
        subject: `🎯 Portfolio Inquiry from ${name || 'Recruiter'} (${email})`,
        botcheck: false,
      }),
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({
        success: true,
        message: 'Message delivered successfully to inbox!',
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: data.message || 'Web3Forms service returned an error.',
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message due to a server error.' },
      { status: 500 }
    );
  }
}
