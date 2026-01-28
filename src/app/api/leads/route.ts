import { leadFullSchema } from '@/lib/validations';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate with Zod
    const parsed = leadFullSchema.safeParse(body);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const field = issue.path.join('.');
        fieldErrors[field] = issue.message;
      });
      return NextResponse.json(
        { success: false, error: { message: 'Validation failed', fields: fieldErrors } },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Honeypot check — if filled, silently accept (don't tip off bots)
    if (data.website) {
      return NextResponse.json(
        { success: true, data: { id: 'ok', message: 'Lead submitted successfully' } },
        { status: 200 }
      );
    }

    // Insert into Supabase
    const { data: lead, error: dbError } = await getSupabaseAdmin()
      .from('tpg_leads')
      .insert({
        full_name: data.full_name,
        email: data.email,
        program: data.program,
        phone: data.phone || null,
        nationality: data.nationality || null,
        country_of_residence: data.country_of_residence || null,
        investment_timeline: data.investment_timeline || null,
        questions: data.questions || null,
        newsletter_consent: data.newsletter_consent,
        source: 'points-guy',
      })
      .select('id')
      .single();

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      return NextResponse.json(
        { success: false, error: { message: 'Something went wrong. Please try again.' } },
        { status: 500 }
      );
    }

    // Fire-and-forget webhook to n8n
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: lead.id,
          full_name: data.full_name,
          email: data.email,
          program: data.program,
          phone: data.phone || null,
          nationality: data.nationality || null,
          country_of_residence: data.country_of_residence || null,
          investment_timeline: data.investment_timeline || null,
          questions: data.questions || null,
          newsletter_consent: data.newsletter_consent,
          source: 'points-guy',
        }),
      }).catch((err) => {
        console.error('Webhook error (non-blocking):', err);
      });
    }

    return NextResponse.json(
      { success: true, data: { id: lead.id, message: 'Lead submitted successfully' } },
      { status: 201 }
    );
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Something went wrong. Please try again.' } },
      { status: 500 }
    );
  }
}
