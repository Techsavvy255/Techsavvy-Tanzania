# Techsavvy Tanzania — Usanidi wa Google Sign-In

## HATUA 1 — Pata "Callback URL" ya Supabase

1. Kwenye Supabase, nenda Authentication &rarr; Providers &rarr; Google.
2. Nakili ile "Callback URL (for OAuth)" inayoonekana pale (mfano:
   `https://emoypdxxgvfkwnsaeyjo.supabase.co/auth/v1/callback`).
   Usifunge ukurasa huu bado.

## HATUA 2 — Tengeneza OAuth Credentials kwenye Google Cloud

1. Nenda https://console.cloud.google.com, ingia na Gmail yako.
2. Tengeneza mradi mpya (jina lolote, mfano "Techsavvy Tanzania").
3. Nenda "APIs & Services" &rarr; "OAuth consent screen".
   - User Type: "External"
   - Jaza jina la app ("Techsavvy Tanzania"), email yako, Save/Continue
     kwenye hatua zote hadi mwisho (Publish app ukitaka iwe live kwa
     kila mtu, si watumiaji 100 wa majaribio tu).
4. Nenda "Credentials" &rarr; "Create Credentials" &rarr; "OAuth client ID".
   - Application type: "Web application"
   - Authorized redirect URIs: bandika ile Callback URL uliyonakili
     Hatua 1.
   - Bofya Create.
5. Utapewa "Client ID" na "Client Secret" — nakili zote mbili.

## HATUA 3 — Weka Client ID/Secret kwenye Supabase

1. Rudi kwenye ukurasa wa Supabase (Authentication &rarr; Providers &rarr;
   Google) ulioacha wazi.
2. Washa (Enable) Google provider.
3. Bandika Client ID na Client Secret ulizopata.
4. Save.

## HATUA 4 — Ruhusu Site URL yako

1. Kwenye Supabase, nenda Authentication &rarr; URL Configuration.
2. Kwenye "Site URL", weka:
   `https://techsavvy255.github.io/Techsavvy-Tanzania/`
3. Kwenye "Redirect URLs", ongeza vivyo hivyo (au `/dashboard.html`
   mwishoni), Save.

## HATUA 5 — Pakia faili mpya kwenye GitHub

Hariri (Edit) faili zilizopo, bandika content mpya:
- `login.html`
- `register.html`
- `assets/member-login.js`
- `assets/register.js`
- `style.css`

## HATUA 6 — Jaribu

1. Fungua `login.html`, bofya "Continue with Google".
2. Chagua akaunti yako ya Gmail, ruhusu (Allow).
3. Unapaswa kuishia kwenye `dashboard.html` moja kwa moja.

## Muhimu
- Kama Google inaonyesha "Error 400: redirect_uri_mismatch" — URL
  uliyoweka Hatua 2 haifanani kabisa na ile ya Hatua 1 (hata herufi
  moja tofauti inasababisha error). Kagua kwa makini, nakili-bandika
  badala ya kuandika kwa mkono.
