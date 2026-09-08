# Techsavvy Tanzania — Usanidi wa Email Confirmation

Hii itatuma email kiotomatiki: (1) applicant anapotuma fomu, na
(2) admin anapobadilisha status ya application.

## HATUA 1 — Tengeneza akaunti ya Resend (bure)

1. Nenda https://resend.com kisha "Sign Up" (bure, hadi email 100/siku).
2. Baada ya kuingia, nenda **API Keys** (upande wa kushoto).
3. Bofya "Create API Key", ipe jina lolote, nakili funguo hiyo (huwezi
   kuiona tena baadaye — ihifadhi mahali salama kwa muda).

## HATUA 2 — Weka funguo hiyo kwenye Supabase (kama "Secret")

1. Kwenye Supabase, nenda **Edge Functions** (upande wa kushoto).
2. Tafuta "Secrets" au "Manage secrets" (kawaida kwenye settings za
   Edge Functions).
3. Ongeza secret mpya: Jina `RESEND_API_KEY`, thamani = ile funguo
   uliyonakili kutoka Resend.

## HATUA 3 — Tengeneza Edge Functions mbili

1. Kwenye Supabase, nenda **Edge Functions** &rarr; "Deploy a new function"
   (au "Create a new function").
2. Jina la function ya kwanza: `send-confirmation-email`
   Bandika ndani yake YOTE kutoka faili
   `supabase/functions/send-confirmation-email/index.ts` niliyokutengenezea.
   Bofya Deploy.
3. Rudia kwa function ya pili: `send-status-email`
   Bandika kutoka `supabase/functions/send-status-email/index.ts`.
   Bofya Deploy.

## HATUA 4 — Pakia JS mpya kwenye GitHub

1. Badilisha faili zako za `apply.js` na `admin.js` (kwenye `assets/`
   yako, si `assets/js/`) na hizi mpya nilizokutengenezea — nimeongeza
   tu sehemu ndogo ya kutuma email, si kubadilisha muundo mzima.

## HATUA 5 — Jaribu

1. Tuma application mpya kwenye `apply.html` na email yako halisi.
2. Angalia inbox yako (na folder ya Spam) — email inapaswa kufika
   ndani ya sekunde chache.
3. Badilisha status ya application hiyo kwenye `admin.html` — email
   nyingine inapaswa kufika ikieleza mabadiliko ya status.

## MUHIMU

- Kwa sasa email zinatumwa kutoka `onboarding@resend.dev` (anwani ya
  majaribio ya Resend) — hii inafanya kazi bila kuhitaji domain yenu
  wenyewe, lakini email zinaweza kuingia "Spam" mara kwa mara.
- Mkipata domain yenu wenyewe baadaye (mfano techsavvytanzania.co.tz),
  tunaweza kuiunganisha na Resend ili email zitoke kama
  "noreply@techsavvytanzania.co.tz" — hii inapunguza sana uwezekano wa
  kuingia Spam.
- Kama email haifiki: angalia Supabase &rarr; Edge Functions &rarr; Logs
  za kila function, kuona kama kuna error, tuma screenshot kwangu.
