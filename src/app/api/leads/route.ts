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

    // Store programs as comma-separated string in the program column
    const programValue = data.programs.join(', ');

    // Insert into Supabase
    const { data: lead, error: dbError } = await getSupabaseAdmin()
      .from('tpg_leads')
      .insert({
        full_name: data.full_name,
        email: data.email,
        program: programValue,
        phone: data.phone || null,
        nationality: data.nationality || null,
        country_of_residence: data.country_of_residence || null,
        investment_timeline: data.investment_timeline || null,
        questions: data.questions || null,
        newsletter_consent: data.newsletter_consent,
        source: 'mercan',
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

    // Split full_name into firstName/lastName for n8n compatibility
    const nameParts = data.full_name.trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Fire-and-forget: n8n webhook
    const n8nUrl = process.env.N8N_WEBHOOK_URL;
    if (n8nUrl) {
      fetch(n8nUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: lead.id,
          full_name: data.full_name,
          first_name: firstName,
          last_name: lastName,
          firstName,
          lastName,
          email: data.email,
          programs: data.programs,
          program: programValue,
          phone: data.phone || null,
          nationality: data.nationality || null,
          country_of_residence: data.country_of_residence || null,
          investment_timeline: data.investment_timeline || null,
          message: data.questions || null,
          questions: data.questions || null,
          newsletter_consent: data.newsletter_consent,
          source: 'mercan',
        }),
      }).catch((err) => {
        console.error('n8n webhook error (non-blocking):', err);
      });
    }

    // Fire-and-forget: dynamic webhooks from tpg_webhooks table
    const leadPayload = {
      id: lead.id,
      full_name: data.full_name,
      email: data.email,
      programs: data.programs,
      program: programValue,
      phone: data.phone || null,
      nationality: data.nationality || null,
      country_of_residence: data.country_of_residence || null,
      investment_timeline: data.investment_timeline || null,
      questions: data.questions || null,
      newsletter_consent: data.newsletter_consent,
      source: 'mercan',
    };

    Promise.resolve(
      getSupabaseAdmin()
        .from('tpg_webhooks')
        .select('name, url, secret, field_mappings')
        .eq('event_type', 'new_lead')
        .eq('active', true)
    ).then(({ data: webhooks }) => {
      if (!webhooks) return;
      for (const wh of webhooks) {
        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (wh.secret) headers['X-Webhook-Secret'] = wh.secret;

        // Apply field mappings: rename keys in leadPayload based on webhook config
        let mappedPayload: Record<string, unknown> = { ...leadPayload };
        const mappings = wh.field_mappings as Record<string, string> | null;
        if (mappings && typeof mappings === 'object') {
          const remapped: Record<string, unknown> = {};
          for (const [sourceKey, value] of Object.entries(mappedPayload)) {
            const targetKey = mappings[sourceKey];
            if (targetKey && targetKey.trim()) {
              remapped[targetKey.trim()] = value;
            } else {
              remapped[sourceKey] = value;
            }
          }
          mappedPayload = remapped;
        }

        fetch(wh.url, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            event: 'new_lead',
            timestamp: new Date().toISOString(),
            data: mappedPayload,
          }),
        }).catch((err) => {
          console.error(`Webhook "${wh.name}" failed:`, err.message);
        });
      }
    }).catch((err) => {
      console.error('Webhook query error (non-blocking):', err);
    });

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
