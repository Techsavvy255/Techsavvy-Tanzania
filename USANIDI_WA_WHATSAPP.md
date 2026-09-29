# Techsavvy Tanzania — Usanidi wa WhatsApp (Twilio Sandbox)

## Ukweli muhimu kuhusu Sandbox
Sandbox ni **halali na inatuma WhatsApp za kweli**, lakini kila namba ya
simu ya applicant lazima "ijiunge" MARA MOJA kwa kutuma neno maalum
kwenye WhatsApp kwa namba ya Twilio, kabla haijaanza kupokea. Hii ni
sharti la Twilio kwa sandbox, si dosari ya mfumo wetu.

## HATUA 1 — Twilio account

1. Nenda https://www.twilio.com/try-twilio, jisajili bure.
2. Kwenye dashboard, nenda "Messaging" &rarr; "Try it out" &rarr;
   "Send a WhatsApp message" (au tafuta "WhatsApp Sandbox").
3. Utapewa: namba ya Sandbox (mfano +1 415 523 8886) na neno la
   kujiunga (mfano "join red-elephant").

## HATUA 2 — Jiunge na Sandbox (wewe na kila applicant, kwa sasa)

1. Fungua WhatsApp yako, tuma ujumbe kwa namba ya Sandbox ukiandika
   hilo neno la kujiunga (mfano "join red-elephant").
2. Utapata jibu la uthibitisho.
3. **Kwa sasa, kila applicant anayetaka kupokea WhatsApp lazima afanye
   hivi hivi hivi kwanza** — hii ndiyo mpaka wa Sandbox. Tutaiondoa
   Hatua 6 (Production) itakapokamilika.

## HATUA 3 — Pata Account SID na Auth Token

1. Kwenye Twilio Console (ukurasa mkuu), nakili "Account SID" na
   "Auth Token" (bofya "Show" kuiona Auth Token).

## HATUA 4 — Weka secrets tatu kwenye Supabase

Kwenye Supabase &rarr; Edge Functions &rarr; Secrets, ongeza:
- `TWILIO_ACCOUNT_SID` = ile Account SID
- `TWILIO_AUTH_TOKEN` = ile Auth Token
- `TWILIO_WHATSAPP_FROM` = `whatsapp:+14155238886` (badilisha namba
  kama Twilio ilikupa nyingine — hakikisha ina "whatsapp:" mbele)

## HATUA 5 — Tengeneza Edge Functions mbili

Kama tulivyofanya kwa email: Deploy a new function &rarr; Via Editor,
andika JINA KWANZA, kisha bandika code:
1. Jina: `send-whatsapp-confirmation` &rarr; code kutoka
   `send-whatsapp-confirmation.ts`
2. Jina: `send-whatsapp-status` &rarr; code kutoka
   `send-whatsapp-status.ts`

## HATUA 6 — Pakia apply.js na admin.js mpya

Hariri (Edit) faili zilizopo kwenye `assets/` — `apply.js` na
`admin.js` — na content mpya niliyotoa (zina WhatsApp + email zote
mbili sasa).

## HATUA 7 — Jaribu

1. Kwanza wewe jiunge na Sandbox (Hatua 2) kwa namba yako mwenyewe.
2. Tuma application kwenye apply.html ukiweka NAMBA YAKO YA SIMU
   (pamoja na country code, mfano +2557XXXXXXXX) kwenye field ya Phone.
3. Angalia WhatsApp yako — ujumbe unapaswa kufika ndani ya sekunde.

## HATUA 8 (Baadaye wiki hii) — Production (bila hatua ya kujiunga)

Hii inahitaji:
1. WhatsApp Business Account iliyothibitishwa (verified) Meta.
2. Kutuma "Message Template" kwa Meta kuidhinishwa (mfano: "Application
   Confirmation") — kawaida masaa machache hadi siku 1-2.
3. Kununua/kusajili namba ya simu ya WhatsApp Business (Twilio
   inaweza kukusaidia hili, kuna gharama ndogo).

Nitakuongoza hatua hizi wiki hii baada ya Sandbox kufanya kazi vizuri
leo.
