// Supabase Edge Function: send-confirmation-email
// Sends a "we received your application" email via Resend.

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const FROM_EMAIL = "Techsavvy Tanzania <onboarding@resend.dev>";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { email, full_name, application_number, category } = await req.json();

    if (!email || !application_number) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const html = `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color:#1E3FE0;">Thank you, ${full_name}!</h2>
        <p>We've received your application to join Techsavvy Tanzania as a <strong>${category.replace("_", " ")}</strong>.</p>
        <p>Your Application Number:</p>
        <p style="font-size:20px; font-weight:bold; color:#1E3FE0;">${application_number}</p>
        <p>Save this number — you can use it to track your application status at:
          <a href="https://techsavvy255.github.io/Techsavvy-Tanzania/track.html">track.html</a>
        </p>
        <p>We'll be in touch soon.</p>
        <p>— Techsavvy Tanzania Team</p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [email],
        subject: `Application Received — ${application_number}`,
        html,
      }),
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: res.ok ? 200 : 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
