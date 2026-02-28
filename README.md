# CourtBook v2 — Indoor Sports Scheduling and Management System

A complete frontend-only court booking system with Supabase authentication, role-based access control, and full admin management. Built with plain HTML, CSS, and JavaScript. Deployable to Netlify via folder drop.

---

## File Structure

```
courtbook/
├── login.html              — Auth entry point (sign in / register)
├── index.html              — User portal (booking flow)
├── admin.html              — Admin dashboard (full management)
├── css/
│   └── style.css           — Shared design system
├── js/
│   ├── auth.js             — Supabase auth client and session helpers
│   ├── store.js            — localStorage data engine and seed data
│   ├── app.js              — User booking logic
│   └── admin.js            — Admin CRUD logic
├── supabase_setup.sql      — One-time DB setup (run in Supabase SQL Editor)
└── _redirects              — Netlify routing config
```

---

## Supabase Setup (One-Time)

1. Open your Supabase project dashboard
2. Go to **SQL Editor**
3. Paste and run the full contents of `supabase_setup.sql`
4. This creates the `user_roles` table with RLS policies

### Promoting a User to Admin

After a user registers via the app:

1. Go to **Authentication > Users** in Supabase
2. Copy the user's UUID
3. Run in SQL Editor:

```sql
insert into public.user_roles (user_id, role)
values ('<paste-uuid-here>', 'admin')
on conflict (user_id) do update set role = 'admin';
```

---

## How Auth Works

- All pages load `js/auth.js` first
- `index.html` and `admin.html` call `Auth.requireLogin()` and `Auth.requireAdmin()` respectively — unauthenticated users are immediately redirected to `login.html`
- On login, the app calls Supabase Auth, then fetches the user's role from the `user_roles` table
- Session is stored in `localStorage` with a TTL matching the Supabase token expiry
- Admins are redirected to `admin.html`; regular users go to `index.html`
- The header on every page shows the signed-in email, role badge, and a Sign Out button

---

## Roles

| Role  | Access                              |
|-------|-------------------------------------|
| user  | index.html — booking portal only    |
| admin | admin.html — full management access |

---

## Features

### User Portal (index.html)
- 4-step booking flow: Select Court, Date/Time, Add-Ons, Confirm
- Live availability per court with today's booked slots
- Real-time cost preview: base rate + peak surcharge + member discount + equipment
- Membership tier selection with discount applied to total
- Equipment rental and bundle add-ons
- Waitlist modal when a slot is already booked
- Concurrency soft-lock: holds a slot for 5 minutes during booking
- Full bookings table with cancel

### Admin Dashboard (admin.html)
- **Feature Toggles** — enable/disable modules (dynamic pricing, memberships, equipment, bundles, waitlist, concurrency lock)
- **Courts** — add/remove courts, set base rate, toggle active status
- **Time Slots** — set operating hours, add blocked maintenance periods
- **Dynamic Pricing** — define peak hour rules with custom multipliers
- **Memberships** — manage tiered discount plans with booking priority
- **Equipment** — manage rental inventory with stock adjustment
- **Bundles** — create gear bundle deals
- **Bookings and Waitlist** — view all active bookings and waitlist entries, cancel bookings

---

## Deployment (Netlify)

1. Unzip `courtbook.zip`
2. Go to [app.netlify.com](https://app.netlify.com) and drag the `courtbook/` folder into the deploy area
3. Done — all three pages are live

---

## Local Testing

Open `login.html` directly in a browser. No server required for local use. Note: Supabase auth calls require an internet connection.

---

## Notes

- Court data, bookings, and settings are stored in `localStorage` — they persist across sessions on the same browser but are not shared across devices or users
- Supabase is used exclusively for authentication and role management
- All session data resets if the user clears browser storage
