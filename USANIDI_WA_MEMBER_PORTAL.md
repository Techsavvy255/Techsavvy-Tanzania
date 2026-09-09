# Techsavvy Tanzania — Usanidi wa Member Accounts (Login/Register)

## HATUA 1 — Run SQL mpya

1. Kwenye Supabase, nenda SQL Editor &rarr; New query.
2. Nakili YOTE kutoka faili `supabase/profiles-schema.sql`, bandika, Run.

## HATUA 2 — (Chaguo) Zima "Email Confirmation" kwa urahisi wa majaribio

Kwa default, Supabase inahitaji mtu athibitishe email yake kabla ya
kuweza ku-login. Kwa majaribio ya haraka, unaweza kuizima kwa muda:

1. Nenda Authentication &rarr; Providers &rarr; Email.
2. Zima "Confirm email" (toggle iwe OFF).
3. Save.

(Baadaye ukiwa tayari kwa watumiaji halisi, unaweza kuiwasha tena —
itahitaji kuunganisha na huduma ya email kama Resend kwa ajili ya
ujumbe wa uthibitisho.)

## HATUA 3 — Pakia faili mpya kwenye GitHub

Pakia faili hizi kwenye repo yako:
- `register.html` (root)
- `login.html` (root)
- `dashboard.html` (root)
- `assets/register.js`
- `assets/member-login.js`
- `assets/dashboard.js`

## HATUA 4 — Jaribu

1. Fungua `register.html`, jaza jina/email/password, "Create Account".
2. Kama umezima email confirmation (Hatua 2), utaingia moja kwa moja
   kwenye `dashboard.html`.
3. Jaribu kutuma application kwenye `apply.html` ukitumia EMAIL ILE
   ILE uliyoregister nayo.
4. Rudi `dashboard.html` — application hiyo inapaswa kuonekana chini
   ya "My Applications".

## Muhimu

- Hii ni "Login ya Members" — TOFAUTI na "Admin Login"
  (`admin-login.html`). Ni mifumo miwili tofauti kabisa.
- Member akijaribu kufungua `admin.html`, hataruhusiwa kuona chochote
  (isipokuwa email yake ipo kwenye jedwali la `admin_users`).
