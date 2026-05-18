// sections.jsx — Al Hadeeqa painting landing, section components
// Exposes globals at end for app.jsx to consume.

const WA_NUMBER = "971544419854";
const PHONE_NUMBER = "+971544419854";
const WA_TEXT = encodeURIComponent(
  "Hi Al Hadeeqa, I'd like a quote for painting."
);
const waHref = `https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`;
const telHref = `tel:${PHONE_NUMBER.replace(/[^\d+]/g, "")}`;

// ── icons ───────────────────────────────────────────────────────────────
const WAIcon = ({ size = 16 }) => (
  <svg className="wa-glyph" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.554-5.338 11.89-11.893 11.89a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
  </svg>
);
const Arrow = () => (
  <svg className="arrow" width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
    <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ── Top bar ─────────────────────────────────────────────────────────────
function TopBar() {
  return (
    <header className="topbar">
      <a className="logo" href="#top">
        <img src="assets/gold-logo.png" alt="Al Hadeeqa" className="logo-img" />
        <span>Al Hadeeqa <span className="muted" style={{fontStyle:"italic"}}>painting</span></span>
        <small>est. 2009</small>
      </a>
      <nav>
        <a href="#interior">Interior</a>
        <a href="#exterior">Exterior</a>
        <a href="#process">Process</a>
        <a href="#faq">FAQ</a>
      </nav>
      <a className="phone" href={telHref}>+971 54 441 9854</a>
      <a className="btn btn--wa" href={waHref} target="_blank" rel="noreferrer">
        <WAIcon /> WhatsApp
      </a>
    </header>
  );
}

// ── Hero ────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero" id="top">
      <image-slot id="hero-bg" class="hero-bg"
        shape="rect"
        fit="cover"
        src="assets/hero-bg.jpg"
        placeholder="Drop a hero photograph — interior or exterior · 16:9 or wider works best">
      </image-slot>
      <div className="hero-scrim" aria-hidden="true" />
      <div className="wrap">
        <div className="hero-panel">
          <div className="hero-grid">
            <div className="hero-text">
              <div className="hero-eyebrow">
                <span className="line" />
                <span className="eyebrow">Interior &amp; Exterior · Dubai · since 2009</span>
              </div>
              <h1>
                Walls done<br/>
                <em>quietly</em>, properly,<br/>
                once.
              </h1>
              <p className="sub">
                <b style={{fontWeight:500, color:"var(--ink)"}}>Interior and exterior painting</b> —
                villas, apartments, facades, offices. Fifteen years in Dubai by a licensed
                construction company with a 50-strong in-house crew. Free site visit, written
                quote in 24 hours, fixed price, furniture protected.
              </p>
              <div className="hero-ctas">
                <a className="btn btn--wa btn--lg" href={waHref} target="_blank" rel="noreferrer">
                  <WAIcon size={18} /> WhatsApp us a photo
                </a>
                <a className="btn btn--ghost btn--lg" href="#form">
                  Request a quote <Arrow />
                </a>
              </div>
              <div className="hero-meta">
                <span>ISO 9001 / 14001 / OHSAS 18001</span>
                <span>ASCB(E) accredited</span>
                <span>50+ in-house crew</span>
              </div>
            </div>

            <SwatchVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

// Stacked paint-card visual on the right of the hero — a stand-in for the
// eventual hero photograph, but designed to feel intentional on its own.
function SwatchVisual() {
  const cards = [
    { kind: "Interior", name: "Khor Cream",      code: "AH-104", color: "oklch(0.94 0.018 78)",  ink: "oklch(0.205 0.012 60)", note: "Living rooms · bedrooms" },
    { kind: "Interior", name: "Burj Terracotta", code: "AH-218", color: "oklch(0.585 0.135 42)", ink: "oklch(0.985 0.006 85)", note: "Feature walls · joinery" },
    { kind: "Exterior", name: "Jumeirah Sand",   code: "AH-505", color: "oklch(0.78 0.045 75)",  ink: "oklch(0.205 0.012 60)", note: "Villa facades · UV-stable" },
    { kind: "Exterior", name: "Wadi Charcoal",   code: "AH-902", color: "oklch(0.22 0.012 60)",  ink: "oklch(0.94 0.018 78)",  note: "Compound walls · trim" },
  ];
  return (
    <div className="hero-swatches">
      {cards.map((c, i) => (
        <div key={i} className="hero-swatch" data-odd={i % 2 === 0 ? "1" : "0"}
             style={{ background: c.color, color: c.ink }}>
          <div className="hero-swatch-top">
            <span className="hero-swatch-kind" style={{ borderColor: c.ink }}>
              <span className="dot" style={{ background: c.ink }} />{c.kind}
            </span>
            <span className="hero-swatch-code">{c.code}</span>
          </div>
          <div className="hero-swatch-name">{c.name}</div>
          <div className="hero-swatch-note">{c.note}</div>
        </div>
      ))}
    </div>
  );
}

// ── Offer band ──────────────────────────────────────────────────────────
function OfferBand() {
  return (
    <section className="offer">
      <div className="wrap">
        <div className="offer-grid">
          <div>
            <div className="eyebrow">The offer · summer 2026</div>
            <h2>
              Free site visit. <em>Written quote in 24 hours.</em><br/>
              Fixed price, no surprises.
            </h2>
            <p className="fine">
              Send us a few photos on WhatsApp or book a visit — a senior estimator
              comes out, measures, asks the right questions, and you get a line-itemed
              quote the next day. If we can't hit 24 hours, the site visit's on us anyway.
            </p>
          </div>
          <a className="btn btn--wa btn--lg" href={waHref} target="_blank" rel="noreferrer">
            <WAIcon size={18} /> Book a site visit
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Interior section ────────────────────────────────────────────────────
function InteriorSection() {
  const items = [
    { n: "01", t: "Surface prep, the long way", d: "Filling, sanding, priming, masking. Hairline cracks repaired before the first coat — not painted over." },
    { n: "02", t: "Furniture moved &amp; protected", d: "Heavy items shifted by our crew, soft furnishings wrapped, floors covered. You come back to a clean home." },
    { n: "03", t: "Premium emulsion paints", d: "Jotun, Dulux or National Paints — your call. We'll bring sample pots so you can see the colour on your wall first." },
    { n: "04", t: "Ceilings, trim &amp; feature walls", d: "Done with the same crew at the same time. Skirting and joinery handled with cabinet-grade finish." },
    { n: "05", t: "Move-back-in same day", d: "Standard rooms re-occupied that evening. Whole-villa repaints scheduled around your routine." },
  ];
  const finishes = [
    { nm: "Matte",     swatch: "oklch(0.78 0.012 75)", code: "F-01" },
    { nm: "Eggshell",  swatch: "oklch(0.88 0.022 78)", code: "F-02" },
    { nm: "Satin",     swatch: "oklch(0.84 0.034 60)", code: "F-03" },
    { nm: "Textured",  swatch: "oklch(0.72 0.018 65)", code: "F-04" },
    { nm: "Metallic",  swatch: "oklch(0.68 0.05 80)",  code: "F-05" },
  ];
  return (
    <section className="section" id="interior">
      <div className="wrap">
        <div className="service">
          <div className="service-body">
            <div className="eyebrow" style={{marginBottom:14}}>I · Interior</div>
            <h3>Villas, apartments,<br/>offices — <em>handled<br/>like joinery</em>.</h3>
            <p className="lede">
              An interior repaint should feel like a piece of furniture being delivered:
              quiet, contained, done. Our process is built to disappear into your week —
              not turn your home into a building site.
            </p>

            <ul className="included">
              {items.map(it => (
                <li key={it.n}>
                  <span className="n">{it.n}</span>
                  <div>
                    <div className="ttl" dangerouslySetInnerHTML={{__html: it.t}} />
                    <div className="desc">{it.d}</div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="eyebrow" style={{marginTop:36, marginBottom:14}}>Finishes available</div>
            <div className="finishes">
              {finishes.map(f => (
                <div key={f.code} className="finish" style={{background: f.swatch, color: "oklch(0.18 0.01 60)"}}>
                  <span className="nm">{f.nm}</span>
                  <span>{f.code}</span>
                </div>
              ))}
            </div>

            <div className="eyebrow" style={{marginTop:36, marginBottom:10}}>Paint partners</div>
            <div className="brands">
              <span className="brand-chip"><span className="dot" /> Jotun</span>
              <span className="brand-chip"><span className="dot" /> Dulux</span>
              <span className="brand-chip"><span className="dot" /> National Paints</span>
              <span className="brand-chip"><span className="dot" /> Caparol on request</span>
            </div>
          </div>

          <div>
            <div className="service-visual">
              <img src="assets/interior-painting.jpg" alt="Interior painting — Al Hadeeqa"
                style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",display:"block"}} />
              <div className="ph-label">
                <span>Plate 01 / Interior</span>
                <span>Dubai · 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Exterior section ────────────────────────────────────────────────────
function ExteriorSection() {
  const items = [
    { n: "01", t: "Pressure wash &amp; crack repair", d: "Facade washed down, all hairlines, blisters and damp patches fixed by our own civil team before paint." },
    { n: "02", t: "Waterproof primer", d: "Two-coat alkaline-resistant primer that locks the substrate before topcoats — the difference between a 2-year and 8-year repaint." },
    { n: "03", t: "UAE-grade weatherproof topcoats", d: "UV-stable, anti-fungal, heat-reflective. Specced for 45 °C summers and salt-laden coastal air." },
    { n: "04", t: "Scaffolding &amp; access in-house", d: "Our own crew, our own scaffold. No third-party rentals, no waiting on someone else's schedule." },
    { n: "05", t: "Warrantied work", d: "Two to five years depending on system. Honoured by us — not the paint company — so the chain stops at one phone call." },
  ];
  return (
    <section className="section section--deep" id="exterior">
      <div className="wrap">
        <div className="service service--flip">
          <div className="service-visual">
            <img src="assets/exterior-painting.jpg" alt="Exterior painting — Al Hadeeqa"
              style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",display:"block"}} />
            <div className="ph-label">
              <span>Plate 02 / Exterior</span>
              <span>Dubai · 2024</span>
            </div>
          </div>

          <div className="service-body">
            <div className="eyebrow" style={{marginBottom:14}}>II · Exterior</div>
            <h3>Facades, compound walls,<br/>buildings — <em>built for<br/>45 °C summers</em>.</h3>
            <p className="lede">
              The Dubai climate has opinions about paint. Heat, UV, sand-blast,
              salt air, humidity swings. We spec exterior systems for the
              conditions in front of us, not a colour card written in Hamburg.
            </p>

            <ul className="included">
              {items.map(it => (
                <li key={it.n}>
                  <span className="n">{it.n}</span>
                  <div>
                    <div className="ttl" dangerouslySetInnerHTML={{__html: it.t}} />
                    <div className="desc">{it.d}</div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="spec-card">
              <div className="spec-row">
                <div>
                  <div className="label">Warranty</div>
                  <div className="stat"><em>2–5 yr</em></div>
                  <p>Depending on system specced.</p>
                </div>
                <div>
                  <div className="label">Surface temps tested to</div>
                  <div className="stat">75 °C</div>
                  <p>Roof &amp; west-facing facades.</p>
                </div>
                <div>
                  <div className="label">Access</div>
                  <div className="stat">G+3</div>
                  <p>In-house scaffold. Higher on request.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Process ─────────────────────────────────────────────────────────────
function Process() {
  const steps = [
    { n: "Step 01", t: "Free site visit", d: "We come to you. Measure, look at the surfaces, ask what you actually want. 30–45 minutes.", when: "Within 48 hrs" },
    { n: "Step 02", t: "Written quote", d: "Line-itemed, fixed price. Paint brand and finish specified. Honest about what doesn't need doing.", when: "Within 24 hrs" },
    { n: "Step 03", t: "Schedule &amp; prep", d: "Dates pinned around your week. Materials sourced. Sample pots delivered if you're still deciding.", when: "Your call" },
    { n: "Step 04", t: "Execution", d: "Same in-house crew start to finish. Project lead on site daily. Daily photo update if you're away.", when: "1–14 days" },
    { n: "Step 05", t: "Walkthrough", d: "We walk every room with you. Snag list closed before invoice. Touch-up kit left with you.", when: "Day of handover" },
  ];
  return (
    <section className="section" id="process">
      <div className="wrap">
        <div className="section-head">
          <span className="num">§ 04 / Process</span>
          <h2>From <em>first message</em> to last brushstroke — five visible steps.</h2>
          <p className="lede">No vanishing-painter routine. You always know who's coming, when, with what, and what they're costing.</p>
        </div>
        <div className="process-grid">
          {steps.map(s => (
            <div key={s.n} className="step">
              <span className="n">{s.n}</span>
              <h4 dangerouslySetInnerHTML={{__html: s.t}} />
              <p>{s.d}</p>
              <span className="when">⏱ {s.when}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Why us ──────────────────────────────────────────────────────────────
function WhyUs() {
  const items = [
    { big: "15+",  bigEm: true, t: "years in Dubai",      d: "Founded 2009. Through every cycle this market has had. We're not closing next quarter." },
    { big: "50+",  bigEm: false, t: "in-house crew",      d: "Painters, civil, scaffold, supervisors — all on our payroll. The team starting your job is the team finishing it." },
    { big: "1",    bigEm: false, t: "phone call covers it", d: "Cracks, damp, ceiling repairs, joinery touch-ups. We're a full contractor — if it isn't paint, we still fix it." },
    { big: "ISO",  bigEm: true,  t: "9001 · 14001 · OHSAS 18001", d: "Quality, environment, health &amp; safety — independently audited. ASCB(E) accredited." },
    { big: "0",    bigEm: false, t: "subcontracted painters", d: "We don't pass your job down a chain. The person on the wall is paid by us." },
    { big: "Fixed", bigEm: true, t: "price quotes",       d: "What's in the quote is what you pay. Scope creep is on us, not you." },
  ];
  return (
    <section className="section section--ink" id="why">
      <div className="wrap">
        <div className="section-head">
          <span className="num">§ 05 / Why us</span>
          <h2>The painters most clients meant<br/>to hire <em>the first time</em>.</h2>
          <p className="lede">
            Painting looks simple from the outside — until something goes wrong and there's no
            one to call. Al Hadeeqa is a full construction company that happens to
            paint extraordinarily well. The boring reasons that matters add up fast.
          </p>
        </div>
        <div className="why-grid">
          <ul className="why-list">
            {items.slice(0, 3).map((it, i) => (
              <li key={i}>
                <div className="big">{it.bigEm ? <em>{it.big}</em> : it.big}</div>
                <div>
                  <div className="ttl">{it.t}</div>
                  <div className="desc" dangerouslySetInnerHTML={{__html: it.d}} />
                </div>
              </li>
            ))}
          </ul>
          <ul className="why-list">
            {items.slice(3).map((it, i) => (
              <li key={i}>
                <div className="big">{it.bigEm ? <em>{it.big}</em> : it.big}</div>
                <div>
                  <div className="ttl" dangerouslySetInnerHTML={{__html: it.t}} />
                  <div className="desc">{it.d}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ── Gallery ─────────────────────────────────────────────────────────────
function Gallery() {
  const tiles = [
    { c: "g-a", tag: "Interior repaint · Dubai", src: "assets/interior-project-1.jpg" },
    { c: "g-b", tag: "Interior · feature wall",  src: "assets/interior-project-2.jpg" },
    { c: "g-c", tag: "Exterior · facade",         src: "assets/exterior-project-1.jpg" },
    { c: "g-d", tag: "Exterior · compound wall",  src: "assets/exterior-project-2.jpg" },
    { c: "g-e", tag: "Interior · villa",          src: "assets/interior-project-3.jpg" },
    { c: "g-f", tag: "Exterior · villa facade",   src: "assets/exterior-project-3.jpg" },
  ];
  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="section-head">
          <span className="num">§ 06 / Selected work</span>
          <h2>Recent <em>plates</em>.</h2>
          <p className="lede">A selection of interior and exterior projects across Dubai.</p>
        </div>
        <div className="gallery">
          {tiles.map(t => (
            <div key={t.c} className={`gphoto ${t.c}`}>
              <img src={t.src} alt={t.tag}
                style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",display:"block"}} />
              <span className="tag">{t.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Trust strip ─────────────────────────────────────────────────────────
function TrustStrip() {
  return (
    <section className="trust">
      <div className="wrap">
        <div className="trust-row">
          <div className="item">
            <div className="v"><em>15+</em></div>
            <div className="l">Years in the UAE</div>
          </div>
          <div className="item">
            <div className="v">50+</div>
            <div className="l">In-house crew</div>
          </div>
          <div className="item">
            <div className="v">500+</div>
            <div className="l">Projects completed</div>
          </div>
          <div className="item">
            <div className="v">24 hr</div>
            <div className="l">Quote turnaround</div>
          </div>
          <div className="cert-marks" aria-label="Certifications">
            <div className="cert"><b>ISO</b>9001</div>
            <div className="cert"><b>ISO</b>14001</div>
            <div className="cert"><b>OHSAS</b>18001</div>
            <div className="cert"><b>ASCB</b>(E)</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FAQ ─────────────────────────────────────────────────────────────────
function FAQ() {
  const data = [
    { q: "What does it actually cost?",
      a: "It depends on size, surface condition, paint brand and finish — but a 1-bedroom apartment full repaint typically lands between AED 1,800 and 3,500, and a 4-bedroom villa exterior between AED 12,000 and 25,000. We quote line-by-line so you can see exactly what the number is. No starting-from games." },
    { q: "How long will it take?",
      a: "A single room is usually a day. A 2-bedroom apartment runs 2–3 days. A typical villa interior is 5–8 days. A facade runs 6–12 days depending on access. Your written quote includes the schedule." },
    { q: "What paint brands do you use?",
      a: "Jotun, Dulux and National Paints as standard — they all make excellent products and the right choice depends on the system, not the badge. Caparol, Benjamin Moore and others available on request for specific specs." },
    { q: "How disruptive is it? We live in the place.",
      a: "Honestly, less than you expect. We move furniture, wrap what we can't move, cover floors, and contain dust with proper masking. Standard rooms are back in use the same evening; whole-villa repaints are sequenced so you've always got somewhere to sleep, work and eat." },
    { q: "Do you give a warranty?",
      a: "Interior work: 1 year against workmanship defects. Exterior: 2 to 5 years depending on the system specced — the warranty card is issued with your invoice and honoured by us directly, not pushed back to the paint manufacturer." },
    { q: "Will you also fix the cracks and damp?",
      a: "Yes — that's why people call us instead of a one-person painter. Al Hadeeqa is a full construction company. Hairlines, peeling, ceiling damp, minor plaster repair, even waterproofing on a balcony — handled by the same project lead, billed in the same quote." },
    { q: "Do you work in all the emirates?",
      a: "Primarily Dubai, but we regularly work in Sharjah, Ajman and Abu Dhabi. Tell us where the job is on the form and we'll confirm." },
  ];
  const [open, setOpen] = React.useState(0);
  return (
    <section className="section" id="faq">
      <div className="wrap">
        <div className="section-head">
          <span className="num">§ 08 / FAQ</span>
          <h2>Things people <em>actually</em> ask before booking.</h2>
        </div>
        <div className="faq-list">
          {data.map((it, i) => (
            <div className="faq-item" key={i} data-open={open === i ? "true" : "false"}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <span className="q">{it.q}</span>
                <span className="ic" />
              </button>
              {open === i && (
                <div className="faq-a">
                  <span />
                  <div>{it.a}</div>
                  <span />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Lead form + Final CTA ───────────────────────────────────────────────
function FinalCTA() {
  const [scope, setScope] = React.useState("both");
  const [form, setForm] = React.useState({ name: "", whatsapp: "", emirate: "Dubai", details: "" });
  const [errs, setErrs] = React.useState({});
  const [sent, setSent] = React.useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!/^[\d+\s\-()]{7,}$/.test(form.whatsapp)) e.whatsapp = "Looks off";
    if (!form.details.trim() || form.details.trim().length < 6) e.details = "A line or two helps";
    return e;
  };
  const submit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrs(e);
    if (Object.keys(e).length === 0) {
      const text = encodeURIComponent(
        `Hi Al Hadeeqa, I'd like a painting quote.\n\nName: ${form.name}\nEmirate: ${form.emirate}\nScope: ${scope}\nDetails: ${form.details}\nWhatsApp: ${form.whatsapp}`
      );
      window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, "_blank", "noopener");
      setSent(true);
    }
  };

  return (
    <section className="section section--deep final" id="form">
      <div className="wrap">
        <div className="final-grid">
          <div>
            <span className="eyebrow">§ 09 / Talk to us</span>
            <h2 style={{marginTop:18}}>The shortest path<br/>is <em>a photo on WhatsApp</em>.</h2>
            <p className="lede">
              Send a picture of the wall, the room, the facade — whatever you want
              painted. We'll come back same day with an honest sense of cost and
              timeline, then book the site visit if it makes sense.
            </p>
            <ul className="contact-list">
              <li>
                <span className="l">WA</span>
                <a className="v" href={waHref} target="_blank" rel="noreferrer">
                  +971 54 441 9854
                  <small>WhatsApp · fastest</small>
                </a>
              </li>
              <li>
                <span className="l">Tel</span>
                <a className="v" href={telHref}>
                  +971 54 441 9854
                  <small>Call · 9 am – 6 pm</small>
                </a>
              </li>
              <li>
                <span className="l">Web</span>
                <a className="v" href="https://alhadeeqacontracting.com" target="_blank" rel="noreferrer">
                  alhadeeqacontracting.com
                  <small>Main site &amp; portfolio</small>
                </a>
              </li>
            </ul>
            <a className="btn btn--wa btn--lg" href={waHref} target="_blank" rel="noreferrer">
              <WAIcon size={18} /> Send a WhatsApp now
            </a>
          </div>

          <form className="form-card" onSubmit={submit} noValidate>
            {sent ? (
              <div className="form-success">
                <div className="check">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12.5 10 17.5 19 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Got it — we'll be in touch within the hour.</h3>
                <p>
                  We received your request. In daytime hours expect a WhatsApp
                  reply within 60 minutes; outside that, first thing the
                  following morning.
                </p>
                <a className="btn btn--wa" href={waHref} target="_blank" rel="noreferrer">
                  <WAIcon /> Or message us directly
                </a>
              </div>
            ) : (
              <>
                <h3>Request a written quote</h3>
                <p className="sub">Takes about a minute. Free site visit, no obligation.</p>

                <div className={`field ${errs.name ? "field--bad" : ""}`}>
                  <label htmlFor="f-name">Your name</label>
                  <input id="f-name" type="text" value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    placeholder="e.g. Layla Hassan" />
                  {errs.name && <div className="field-err">{errs.name}</div>}
                </div>

                <div className={`field ${errs.whatsapp ? "field--bad" : ""}`}>
                  <label htmlFor="f-wa">WhatsApp number</label>
                  <input id="f-wa" type="tel" value={form.whatsapp}
                    onChange={(e) => setForm({...form, whatsapp: e.target.value})}
                    placeholder="+971 50 000 0000" />
                  {errs.whatsapp && <div className="field-err">{errs.whatsapp}</div>}
                </div>

                <div className="field">
                  <label htmlFor="f-em">Emirate</label>
                  <select id="f-em" value={form.emirate}
                    onChange={(e) => setForm({...form, emirate: e.target.value})}>
                    <option>Dubai</option>
                    <option>Abu Dhabi</option>
                    <option>Sharjah</option>
                    <option>Ajman</option>
                    <option>RAK</option>
                    <option>Fujairah</option>
                    <option>Umm Al Quwain</option>
                  </select>
                </div>

                <div className="field">
                  <label>What do you need painted?</label>
                  <div className="seg" role="tablist">
                    {["interior", "exterior", "both"].map(s => (
                      <button key={s} type="button"
                        aria-pressed={scope === s}
                        onClick={() => setScope(s)}>
                        {s === "both" ? "Both" : s[0].toUpperCase() + s.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={`field ${errs.details ? "field--bad" : ""}`}>
                  <label htmlFor="f-dt">A line or two about the job</label>
                  <textarea id="f-dt" value={form.details}
                    onChange={(e) => setForm({...form, details: e.target.value})}
                    placeholder="e.g. 3-bedroom villa in Mirdif, just got keys, need full interior before furniture lands on the 20th." />
                  {errs.details && <div className="field-err">{errs.details}</div>}
                </div>

                <div className="form-submit">
                  <button type="submit" className="btn btn--accent btn--lg">
                    Request quote <Arrow />
                  </button>
                  <span className="muted" style={{fontFamily:"var(--mono)", fontSize:11, letterSpacing:".1em", textTransform:"uppercase"}}>
                    or <a href={waHref} target="_blank" rel="noreferrer" style={{textDecoration:"underline"}}>WhatsApp instead</a>
                  </span>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

// ── Footer ──────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="logo" style={{fontFamily:"var(--serif)", fontSize: 26, marginBottom: 12, display:"flex", alignItems:"center", gap:10}}>
              <img src="assets/gold-logo.png" alt="Al Hadeeqa" style={{height:36, width:"auto", display:"block", flexShrink:0}} />
              Al Hadeeqa Contracting
            </div>
            <p style={{maxWidth:"34ch", color:"var(--ink-mute)"}}>
              Licensed Dubai construction company since 2009. Pergolas, glass &amp;
              aluminium, painting, waterproofing, civil works.
            </p>
          </div>
          <div>
            <h5>Services</h5>
            <ul>
              <li><a href="#interior">Interior painting</a></li>
              <li><a href="#exterior">Exterior painting</a></li>
              <li><a href="https://alhadeeqacontracting.com" target="_blank" rel="noreferrer">Pergolas</a></li>
              <li><a href="https://alhadeeqacontracting.com" target="_blank" rel="noreferrer">Glass &amp; aluminium</a></li>
              <li><a href="https://alhadeeqacontracting.com" target="_blank" rel="noreferrer">Waterproofing</a></li>
            </ul>
          </div>
          <div>
            <h5>Contact</h5>
            <ul>
              <li><a href={waHref} target="_blank" rel="noreferrer">WhatsApp +971 54 441 9854</a></li>
              <li><a href={telHref}>Call +971 54 441 9854</a></li>
              <li><a href="mailto:alhadeeqallc@gmail.com">alhadeeqallc@gmail.com</a></li>
              <li><a href="https://alhadeeqacontracting.com" target="_blank" rel="noreferrer">alhadeeqacontracting.com</a></li>
            </ul>
          </div>
          <div>
            <h5>Compliance</h5>
            <ul>
              <li>ISO 9001:2015</li>
              <li>ISO 14001:2015</li>
              <li>OHSAS 18001:2007</li>
              <li>ASCB(E) accredited</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2009–2026 Al Hadeeqa Contracting LLC</span>
          <span>Dubai · United Arab Emirates</span>
        </div>
      </div>
    </footer>
  );
}

// ── Mobile sticky CTA ───────────────────────────────────────────────────
function MobileCTA() {
  return (
    <div className="mobile-cta">
      <a className="btn btn--wa" href={waHref} target="_blank" rel="noreferrer">
        <WAIcon /> WhatsApp
      </a>
      <a className="btn btn--ghost" href="#form">Request a quote</a>
    </div>
  );
}

Object.assign(window, {
  TopBar, Hero, OfferBand, InteriorSection, ExteriorSection,
  Process, WhyUs, Gallery, TrustStrip, FAQ, FinalCTA, Footer, MobileCTA,
  WA_NUMBER, PHONE_NUMBER, waHref, telHref,
});
