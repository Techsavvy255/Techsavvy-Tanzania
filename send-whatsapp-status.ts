// Supabase Edge Function: send-whatsapp-status
// Sends a WhatsApp message via Twilio when admin changes application status.

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const TWILIO_ACCOUNT_SID = Deno.env.get("TWILIO_ACCOUNT_SID");
const TWILIO_AUTH_TOKEN = Deno.env.get("TWILIO_AUTH_TOKEN");
const TWILIO_WHATSAPP_FROM = Deno.env.get("TWILIO_WHATSAPP_FROM");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const statusMessages: Record<string, string> = {
  under_review: "Your application is now under review.",
  interview: "You've been selected for an interview. We'll contact you with details.",
  approved: "Congratulations! Your application has been approved.",
  rejected: "Thank you for applying. Unfortunately, we won't be moving forward at this time.",
  pending: "Your application status has been updated to Pending.",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { phone, full_name, application_number, status } = await req.json();

    if (!phone || !status) {
      return new Response(JSON.stringify({ error: "Missing phone or status" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const toNumber = phone.startsWith("+") ? phone : `+${phone}`;
    const message = statusMessages[status] || "Your application status has been updated.";
    const body = `Hi ${full_name}, ${message} Application: ${application_number}. Details: https://techsavvy255.github.io/Techsavvy-Tanzania/track.html`;

    const auth = btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`);

    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
      {
        method: "POST",
        headers: {
          "Authorization": `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          From: TWILIO_WHATSAPP_FROM || "",
          To: `whatsapp:${toNumber}`,
          Body: body,
        }),
      }
    );

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
