import { NextResponse } from 'next/server';

/**
 * GET /api/webhook-test
 * Sends a dummy lead payload to the configured N8N_WEBHOOK_URL and reports back
 * whether the webhook responded or failed.
 *
 * Query params:
 *   ?dry=true  — show what would be sent without actually sending
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dry = searchParams.get('dry') === 'true';

  const n8nUrl = process.env.N8N_WEBHOOK_URL;

  if (!n8nUrl) {
    return NextResponse.json(
      {
        success: false,
        error: 'N8N_WEBHOOK_URL is not set in environment variables.',
        hint: 'Add N8N_WEBHOOK_URL to your .env.local file.',
      },
      { status: 500 }
    );
  }

  const testPayload = {
    id: 'test-' + Date.now(),
    full_name: 'Test Lead',
    first_name: 'Test',
    last_name: 'Lead',
    firstName: 'Test',
    lastName: 'Lead',
    email: 'test@example.com',
    programs: ['portugal'],
    program: 'portugal',
    phone: '+1234567890',
    nationality: 'US',
    country_of_residence: 'United States',
    investment_timeline: '3-6 months',
    message: 'This is a webhook test from the landing page.',
    questions: 'This is a webhook test from the landing page.',
    newsletter_consent: false,
    source: 'mercan',
  };

  if (dry) {
    return NextResponse.json({
      success: true,
      mode: 'dry-run',
      webhook_url: n8nUrl,
      payload: testPayload,
    });
  }

  try {
    const start = Date.now();
    const res = await fetch(n8nUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testPayload),
    });

    const elapsed = Date.now() - start;
    let responseBody: unknown;
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      responseBody = await res.json();
    } else {
      responseBody = await res.text();
    }

    return NextResponse.json({
      success: res.ok,
      webhook_url: n8nUrl,
      status: res.status,
      statusText: res.statusText,
      response: responseBody,
      elapsed_ms: elapsed,
      payload_sent: testPayload,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      {
        success: false,
        webhook_url: n8nUrl,
        error: message,
        payload_sent: testPayload,
      },
      { status: 502 }
    );
  }
}
