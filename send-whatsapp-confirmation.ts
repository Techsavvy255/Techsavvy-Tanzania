// Supabase Edge Function: send-whatsapp-confirmation
// Sends a WhatsApp message via Twilio when an application is submitted.

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const TWILIO_ACCOUNT_SID = Deno.env.get("TWILIO_ACCOUNT_SID");
const TWILIO_AUTH_TOKEN = Deno.env.get("TWILIO_AUTH_TOKEN");
const TWILIO_WHATSAPP_FROM = Deno.env.get("TWILIO_WHATSAPP_FROM"); // e.g. whatsapp:+14155238886

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { phone, full_name, application_number, category } = await req.json();

    if (!phone || !application_number) {
      return new Response(JSON.stringify({ error: "Missing phone or application_number" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Normalize phone to E.164-ish (must already include country code, e.g. +2557XXXXXXXX)
    const toNumber = phone.startsWith("+") ? phone : `+${phone}`;

    const body = `Hi ${full_name}, thank you for applying to Techsavvy Tanzania as a ${category.replace("_", " ")}. Your Application Number is *${application_number}*. Track your status anytime at: https://techsavvy255.github.io/Techsavvy-Tanzania/track.html`;

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
