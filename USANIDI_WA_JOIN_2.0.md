# Techsavvy Tanzania — Usanidi wa Join Us 2.0

Hii ni mifumo mipya: `apply.html` (fomu), `track.html` (kufuatilia status),
`admin-login.html` na `admin.html` (dashboard ya admin). Zote zinahitaji
database ya Supabase (bure) ili zifanye kazi. `join.html` haijaguswa.

## HATUA 1 — Tengeneza akaunti ya Supabase (bure)

1. Nenda https://supabase.com kisha "Start your project" — jisajili bure.
2. Tengeneza mradi mpya (New Project). Chagua jina lolote (mfano
   "techsavvy-tanzania") na password ya database (ihifadhi mahali salama).
3. Subiri dakika 1-2 mradi wako uwe tayari.

## HATUA 2 — Run SQL (kutengeneza majedwali)

1. Kwenye Supabase, nenda **SQL Editor** (upande wa kushoto).
2. Bofya "New query".
3. Fungua faili `supabase/schema.sql` niliyokutengenezea, nakili YOTE,
   bandika kwenye SQL Editor.
4. Bofya "Run". Inapaswa kuonyesha "Success. No rows returned."

## HATUA 3 — Pata funguo zako (API keys)

1. Nenda **Project Settings** (gia) &rarr; **API**.
2. Nakili **Project URL** (mfano: `https://xxxxx.supabase.co`)
3. Nakili **anon public** key (KAMWE usinakili "service_role" key).

## HATUA 4 — Weka funguo hizo kwenye code

1. Fungua faili `assets/js/supabase-config.js` kwenye GitHub yako, edit.
2. Badilisha:
   - `PASTE_YOUR_SUPABASE_PROJECT_URL_HERE` &rarr; Project URL yako
   - `PASTE_YOUR_SUPABASE_ANON_PUBLIC_KEY_HERE` &rarr; anon key yako
3. Commit changes.

## HATUA 5 — Tengeneza akaunti yako ya Admin

1. Kwenye Supabase, nenda **Authentication** &rarr; **Users**.
2. Bofya "Add user" &rarr; "Create new user".
3. Weka email na password utakayotumia kuingia kwenye admin.html.
4. Rudi kwenye **SQL Editor**, run amri hii (badilisha email yako):

   ```sql
   insert into admin_users(email) values ('email-lako-hapa@example.com');
   ```

## HATUA 6 — Jaribu mfumo

1. Fungua `apply.html` kwenye site yako — jaza fomu, tuma.
2. Utapokea Application Number — nakili.
3. Fungua `track.html`, bandika hiyo namba — status ionekane "Pending".
4. Fungua `admin-login.html`, ingia na email/password uliyotengeneza.
5. Kwenye dashboard, bofya application hiyo, badilisha status, "Save Changes".
6. Rudi `track.html` — status mpya ionekane.

## MUHIMU — Usalama

- `admin-login.html` na `admin.html` hazina "noindex" tu — bado zinafikika
  na mtu yeyote akijua link. Usalama halisi upo kwenye password + database
  rules (RLS) tulizoweka, si kwenye kuficha link.
- KAMWE usiweke "service_role" key popote kwenye faili za frontend.
- Kama utahitaji admin zaidi ya mmoja, rudia HATUA 5 kwa kila mmoja.

## Ambacho bado halijajengwa (kwa mujibu wa mpango wako)

- Email confirmation ya moja kwa moja kwa applicant (Supabase inaweza
  kutuma email lakini inahitaji usanidi wa ziada wa "Email Templates" na
  wakati mwingine domain yako mwenyewe — tunaweza kuongeza hili baadaye).
- Rate-limiting/spam protection ya ziada (kwa sasa RLS inazuia kusoma data,
  lakini haizuii mtu kutuma fomu nyingi mfululizo — hili linahitaji kazi
  ya ziada, mfano Cloudflare Turnstile/CAPTCHA).
