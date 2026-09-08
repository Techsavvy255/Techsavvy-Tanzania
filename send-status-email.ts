// Supabase Edge Function: send-status-email
// Sends an email when admin changes an application's status.

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const FROM_EMAIL = "Techsavvy Tanzania <onboarding@resend.dev>";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const statusMessages: Record<string, string> = {
  under_review: "Your application is now under review.",
  interview: "You've been selected for an interview. We'll contact you with details.",
  approved: "Congratulations! Your application has been approved.",
  rejected: "Thank you for applying. Unfortunately, we won't be moving forward with your application at this time.",
  pending: "Your application status has been updated to Pending.",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { email, full_name, application_number, status } = await req.json();

    if (!email || !status) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const message = statusMessages[status] || "Your application status has been updated.";

    const html = `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color:#1E3FE0;">Hello ${full_name},</h2>
        <p>${message}</p>
        <p>Application Number: <strong>${application_number}</strong></p>
        <p>You can check full details anytime at:
          <a href="https://techsavvy255.github.io/Techsavvy-Tanzania/track.html">track.html</a>
        </p>
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
        subject: `Application Update — ${application_number}`,
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
