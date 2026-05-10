# Al Hadeeqa Pergolas 2026 — Tracking Unblock Checklist

**Page:** https://offers.alhadeeqacontracting.com/pergolas-2026/
**Goal:** Fully working GA4 + Google Ads conversion tracking before any paid spend
**For:** Claude Code (page changes) + Mohammad/Jan (Google Ads + GA4 admin)
**Estimated total time:** 60–90 minutes

---

## ⚠️ DO NOT REDESIGN, DO NOT CHANGE COPY

This is purely tracking instrumentation. No visible page changes. No copy changes. No layout changes. Every change in this document is either a script tag, an event listener, or a JavaScript event call.

---

## Why this matters

Without working conversion tracking, Google Ads cannot optimise — its bidding AI is starved of feedback and effectively buys clicks at retail price with no learning. Two weeks of paid spend without conversion data is two weeks of wasted budget.

The fix is straightforward but it requires changes in three places — the page itself (Claude Code), the GA4 property (Mohammad), and the Google Ads account (Mohammad). Steps below are sequenced so the page can be deployed first, then verified, then linked.

---

## Part 1 — Page changes (Claude Code)

### 1.1 Activate GA4 in `<head>`

The page already has GA4 code wrapped in HTML comments. Remove the comment wrappers.

**Find this block (currently commented out) in `<head>`:**

```html
<!-- GA4 placeholder. Uncomment when live.
<script async src="https://www.googletagmanager.com/gtag/js?id=G-HCC52FX6VK"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-HCC52FX6VK');
</script>
-->
```

**Replace with the activated, expanded block:**

```html
<!-- GA4 + Google Ads conversion tracking -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-HCC52FX6VK"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-HCC52FX6VK', {
    'page_path': window.location.pathname,
    'page_title': document.title
  });
  gtag('config', 'AW-658897837');
</script>
```

Two things to note:
- The `gtag('config', 'AW-658897837')` line registers Google Ads alongside GA4. Both fire from the same page load. This is required for Google Ads conversion attribution.
- The `page_path` and `page_title` are passed explicitly so GA4 reports show the correct pathname.

### 1.2 Add WhatsApp click tracking

The page has multiple WhatsApp links (hero CTA, three tier CTAs, add-on CTA, contact section, footer, sticky float button). Each click must fire a `whatsapp_click` event tagged with which CTA was clicked, so Google Ads and GA4 can attribute the lead to the right ad group later.

**Add this script block at the end of `<body>`, just before the closing `</body>` tag:**

```html
<!-- Conversion event tracking -->
<script>
(function() {
  // Helper — fire a conversion event to both GA4 and Google Ads
  function trackConversion(eventName, label) {
    if (typeof gtag !== 'function') return;
    
    // GA4 event
    gtag('event', eventName, {
      'event_category': 'engagement',
      'event_label': label,
      'value': 1
    });
    
    // Google Ads conversion (the conversion ID/label values come from Mohammad's setup in Part 3)
    // Replace AW-658897837/XXXXXXXXX with the actual conversion ID/label after Part 3.4
    gtag('event', 'conversion', {
      'send_to': 'AW-658897837/PERGOLA_WHATSAPP_CONV_ID',
      'event_callback': function() {}
    });
  }

  // Track all WhatsApp links — identify by the wa.me href
  document.querySelectorAll('a[href*="wa.me"]').forEach(function(link) {
    link.addEventListener('click', function() {
      // Identify the CTA based on link text or context
      var label = link.textContent.trim().toLowerCase();
      
      // Categorise by tier or CTA type
      if (label.indexOf('classic shade') !== -1) {
        trackConversion('whatsapp_click', 'tier_classic');
      } else if (label.indexOf('louvered shade') !== -1) {
        trackConversion('whatsapp_click', 'tier_louvered');
      } else if (label.indexOf('smart shade') !== -1) {
        trackConversion('whatsapp_click', 'tier_smart');
      } else if (label.indexOf('exterior painting') !== -1 || label.indexOf('add to my project') !== -1) {
        trackConversion('whatsapp_click', 'addon_painting');
      } else if (label.indexOf('discuss') !== -1) {
        trackConversion('whatsapp_click', 'addon_other');
      } else {
        trackConversion('whatsapp_click', 'general_cta');
      }
    });
  });

  // Track form submission (when user clicks "Send via WhatsApp")
  var form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', function() {
      trackConversion('form_submit', 'lead_form');
    });
  }

  // Track phone clicks (secondary conversion)
  document.querySelectorAll('a[href^="tel:"]').forEach(function(link) {
    link.addEventListener('click', function() {
      trackConversion('phone_click', 'phone_cta');
    });
  });

  // Track email clicks (secondary conversion)
  document.querySelectorAll('a[href^="mailto:"]').forEach(function(link) {
    link.addEventListener('click', function() {
      trackConversion('email_click', 'email_cta');
    });
  });
})();
</script>
```

**One placeholder in this block:** `AW-658897837/PERGOLA_WHATSAPP_CONV_ID`. This needs to be replaced with the actual Google Ads conversion ID after Part 3.4 below — see notes there.

### 1.3 Add a comment marker for easy future updates

At the top of the new tracking script, add a comment so anyone updating the page later can find and identify this block:

```html
<!-- 
  ============================================================
  CONVERSION TRACKING — DO NOT REMOVE
  ============================================================
  This block fires events to:
  - GA4 property: G-HCC52FX6VK
  - Google Ads account: AW-658897837
  
  Events tracked:
  - whatsapp_click (with tier/addon labels)
  - form_submit
  - phone_click
  - email_click
  
  Last updated: April 2026
  ============================================================
-->
```

### 1.4 Verification (Claude Code, after deployment)

Before signing off, Claude Code should run these checks:

```bash
# Confirm GA4 is loaded (no longer commented out)
curl -s https://offers.alhadeeqacontracting.com/pergolas-2026/ | grep -c "googletagmanager.com/gtag/js"
# Expected: 1

# Confirm gtag config is present and not commented out
curl -s https://offers.alhadeeqacontracting.com/pergolas-2026/ | grep "G-HCC52FX6VK" | grep -v "<!--"
# Expected: at least 1 line

# Confirm conversion event tracking script is present
curl -s https://offers.alhadeeqacontracting.com/pergolas-2026/ | grep -c "trackConversion"
# Expected: 5+ (function definition + 4+ call sites)
```

---

## Part 2 — GA4 setup (Mohammad)

### 2.1 Confirm the GA4 property exists and you have admin access

1. Go to https://analytics.google.com/
2. Select the property `G-HCC52FX6VK` (this should be the Al Hadeeqa property)
3. Confirm you have **Admin** role (left nav → bottom → "Admin" → "Property Access Management")

If you don't have admin: ask Jan to grant it. Without admin you can't link to Google Ads or create conversion events.

### 2.2 Enable enhanced measurement (if not already enabled)

1. Admin → "Data Streams" → click your web stream
2. Toggle "Enhanced measurement" ON
3. Click the gear icon to configure — make sure these are all enabled:
   - Page views ✓
   - Scrolls ✓
   - Outbound clicks ✓
   - Site search (irrelevant for landing page, but leave on)
   - Form interactions ✓ (this auto-tracks form starts and submits)
   - Video engagement (irrelevant)
   - File downloads (irrelevant)

### 2.3 Mark events as conversions

GA4 doesn't automatically count custom events as conversions — you have to flag them.

1. Admin → "Events"
2. Wait for events to appear (this takes 24 hours after the first time the event fires — see Part 4 verification below)
3. Once events appear, find each of these and toggle "Mark as conversion":
   - `whatsapp_click` — Primary conversion
   - `form_submit` — Primary conversion
   - `phone_click` — Secondary conversion
   - `email_click` — Secondary conversion

Until the event has fired at least once, it won't appear in this list. You may need to deploy the page changes, generate a few test clicks, and come back to this step the next day.

### 2.4 Configure data retention

1. Admin → "Data Settings" → "Data Retention"
2. Set "Event data retention" to **14 months** (max for free GA4)
3. Toggle "Reset user data on new activity" ON

This gives you better year-over-year comparisons later.

---

## Part 3 — Google Ads setup (Mohammad)

### 3.1 Confirm Google Ads account access

1. Go to https://ads.google.com/
2. Confirm account `AW-658897837` (139-165-0837) is accessible
3. Confirm you have at least Standard access

### 3.2 Link GA4 to Google Ads

This is the single most important link. Without it, GA4 conversions don't show up in Google Ads as conversion options.

**From GA4 side:**
1. GA4 Admin → "Product Links" → "Google Ads Links"
2. Click "Link"
3. Choose Google Ads account `AW-658897837`
4. Toggle "Enable Personalised Advertising" ON
5. Toggle "Enable Auto-Tagging" ON
6. Submit

**From Google Ads side (verify):**
1. Google Ads → Tools → "Linked accounts" → "Google Analytics (GA4)"
2. Confirm the link shows as "Active"

### 3.3 Import GA4 conversions into Google Ads

Once the link is live and the events from Part 2.3 have been marked as conversions in GA4:

1. Google Ads → Goals → Conversions → "+ New conversion action"
2. Choose "Import" → "Google Analytics 4 properties" → "Web"
3. Select the conversions you just marked in GA4:
   - `whatsapp_click` — set as **Primary** conversion
   - `form_submit` — set as **Primary** conversion
   - `phone_click` — set as **Secondary** conversion
   - `email_click` — set as **Secondary** conversion

**Important — the "Primary" vs "Secondary" distinction:**
- **Primary conversions** are what Google Ads optimises bidding for. Both WhatsApp click and form submit count as a real lead.
- **Secondary conversions** are tracked but don't influence bidding.

### 3.4 Create native Google Ads conversion (for direct WhatsApp click)

The GA4 import above gives you indirect tracking. For best attribution, also create a native Google Ads conversion that fires directly from the page (not via GA4). This gives you faster reporting and better signal for Smart Bidding.

1. Google Ads → Goals → Conversions → "+ New conversion action"
2. Choose "Website"
3. Goal category: **Submit lead form** (best match for WhatsApp lead)
4. Conversion name: `Pergola WhatsApp Click`
5. Value: "Use the same value for each conversion" — AED 200 (placeholder average lead value; adjust after a few weeks of data)
6. Count: "One" (one conversion per click, even if user clicks multiple times)
7. Click-through conversion window: 30 days
8. View-through conversion window: 1 day
9. Attribution model: Data-driven (default and best)
10. Save and continue

You'll be given a **conversion ID and label** that look like:
`AW-658897837/abcDEF123ghi`

11. **Copy this entire string.** This is the value that needs to replace `AW-658897837/PERGOLA_WHATSAPP_CONV_ID` in the page tracking code from Part 1.2.

### 3.5 Update the page with the real conversion ID

Send the conversion ID/label from 3.4 back to Claude Code (or update yourself) — replace this line in the tracking script:

```javascript
'send_to': 'AW-658897837/PERGOLA_WHATSAPP_CONV_ID',
```

with:

```javascript
'send_to': 'AW-658897837/[your-actual-conversion-id-from-step-3.4]',
```

Redeploy.

### 3.6 Repeat steps 3.4–3.5 for form submission (optional but recommended)

Create a second native conversion for form submission. Same process, different conversion name (`Pergola Lead Form`). Then add a second `gtag('event', 'conversion', ...)` call inside the `form.addEventListener('submit', ...)` block to fire it.

---

## Part 4 — Verification (after all parts complete)

### 4.1 Real-time GA4 check

1. Open the landing page in a browser: https://offers.alhadeeqacontracting.com/pergolas-2026/
2. Open GA4 → "Reports" → "Realtime"
3. You should see **1 user** appear within seconds (yourself). Page path `/pergolas-2026/`.

If the page view doesn't appear:
- Check browser console for JavaScript errors
- Check that `gtag.js` is loading (Network tab in DevTools → search for `gtag/js`)
- Check that ad blockers / privacy extensions aren't blocking it (try in incognito with no extensions)

### 4.2 Test WhatsApp click event

1. On the live page, click the hero "WhatsApp for a free site visit" button
2. Cancel the WhatsApp launch (don't actually send a test message)
3. Switch to GA4 → Realtime → Events
4. Within 30 seconds, you should see a `whatsapp_click` event with `event_label: general_cta`

Repeat with a tier-specific CTA:
1. Click "Quote Classic Shade →"
2. You should see `whatsapp_click` with `event_label: tier_classic`

### 4.3 Test form submission

1. Fill in the form on the page (use test values)
2. Click "Send via WhatsApp →"
3. Cancel the WhatsApp launch
4. GA4 Realtime → Events should show `form_submit` with `event_label: lead_form`

### 4.4 Verify Google Ads tag is firing

1. Install the Chrome extension "Tag Assistant by Google" (free)
2. Visit the landing page
3. Click the extension — it should show:
   - Google Tag Manager: not installed (correct — you're using gtag.js direct)
   - Google Analytics 4: `G-HCC52FX6VK` — Working
   - Google Ads: `AW-658897837` — Working

If Google Ads shows "Not installed" or errors:
- The `gtag('config', 'AW-658897837')` line wasn't added in Part 1.1
- Or the conversion ID in Part 1.2 still has the placeholder value

### 4.5 Wait 24 hours, then mark events as conversions

GA4 takes 24 hours to register a new event type. Come back tomorrow and complete Part 2.3.

### 4.6 Final pre-launch checklist

Before turning Google Ads campaigns from "Paused" to "Enabled":

- [ ] Page loads with no console errors
- [ ] GA4 Realtime shows page views
- [ ] All 4 event types fire correctly (whatsapp_click, form_submit, phone_click, email_click)
- [ ] Events are marked as conversions in GA4
- [ ] GA4 ↔ Google Ads link is Active
- [ ] At least one conversion action is imported into Google Ads
- [ ] Native Google Ads conversion (Part 3.4) is set up with real conversion ID in the page
- [ ] Tag Assistant shows both GA4 and Google Ads tags firing

Once all 8 are checked, tracking is genuinely working and ads can launch live.

---

## Common pitfalls

**1. Events appear in Realtime but not in Reports.**
GA4 has a 24–48 hour processing delay between Realtime and standard Reports. Realtime is for verification; Reports are for analysis. This is normal — don't panic.

**2. Conversions not appearing in Google Ads even after import.**
The GA4 → Google Ads conversion import is one-time only at setup. After that, conversions take 4–6 hours to start flowing through. Wait at least overnight before troubleshooting.

**3. WhatsApp click tracking fires on both desktop and mobile.**
This is correct. Desktop opens WhatsApp Web; mobile opens the WhatsApp app. Both are valid lead intents.

**4. Sticky WhatsApp float button counts as `general_cta`.**
The categorisation logic in Part 1.2 only matches text. The float button has no text (just the icon). It will be categorised as `general_cta`. If you want to track it separately, add a `data-cta` attribute to the float button and update the categorisation logic.

**5. Form submission opens WhatsApp — does that double-count?**
The form has a submit handler that fires `form_submit`, then the form constructs a wa.me URL and opens it in a new tab. The new tab WhatsApp link does NOT fire a click event (it's not a click on a link in the original page). So you get one `form_submit` event per form submission. No double counting.

**6. Ad blockers block tracking.**
Roughly 30–40% of users in Dubai run ad blockers (uBlock Origin, Brave browser, Pi-hole networks). Tracking will under-count by that margin. This is industry standard — every analytics platform faces this. Don't try to bypass it.

---

## What this unlocks

Once tracking is fully live and verified:

1. **You can launch the Google Ads campaign with confidence.** Smart Bidding will have data to optimise against.
2. **You'll see which tier converts best** within 7–14 days. Maybe Smart Shade gets 80% of the clicks but Louvered Shade gets 80% of the conversions — you'd never know without tier-level event tracking.
3. **You'll see which keyword brings the best leads.** The Search Terms report in Google Ads will show conversions per keyword.
4. **You can scale spend on what works** and pause what doesn't. Without tracking, every keyword looks identical at the bidding level.

This is the foundation. Without it, the campaign brief in the next deliverable is just a directional plan, not a measurable system.

---

*End of tracking checklist. Campaign brief follows in a separate document.*
