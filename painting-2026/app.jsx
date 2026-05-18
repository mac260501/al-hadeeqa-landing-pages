// app.jsx — root app
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "khor",
  "accent": "#c46b3c",
  "serifDisplay": "Instrument Serif",
  "showSwatchNames": true,
  "hookLine": "Walls done quietly, properly, once."
}/*EDITMODE-END*/;

const PALETTES = [
  { id: "khor",   label: "Khor Cream",  swatch: ["oklch(0.965 0.012 78)",  "oklch(0.585 0.135 42)", "oklch(0.205 0.012 60)"] },
  { id: "dune",   label: "Dune Brass",  swatch: ["oklch(0.945 0.018 88)",  "oklch(0.55 0.105 65)",  "oklch(0.205 0.018 50)"] },
  { id: "marina", label: "Marina Teal", swatch: ["oklch(0.965 0.006 230)", "oklch(0.49 0.085 210)", "oklch(0.195 0.020 240)"] },
  { id: "ink",    label: "After Ink",   swatch: ["oklch(0.19 0.012 60)",   "oklch(0.72 0.135 55)",  "oklch(0.965 0.012 78)"] },
];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply palette by mutating <html data-palette>
  React.useEffect(() => {
    document.documentElement.setAttribute("data-palette", t.palette);
  }, [t.palette]);

  // Apply hook line via state passthrough — patch the H1 imperatively.
  React.useEffect(() => {
    const h1 = document.querySelector(".hero h1");
    if (!h1 || !t.hookLine) return;
    // We split user line: first half, italic accent middle, last word.
    // For tweak input, we just render plain.
    if (h1.getAttribute("data-tweak-applied") !== t.hookLine) {
      h1.innerHTML = t.hookLine.replace(/\b(quietly|properly|beautifully|carefully)\b/i, "<em>$1</em>");
      h1.setAttribute("data-tweak-applied", t.hookLine);
    }
  }, [t.hookLine]);

  // Display serif tweak — swap the var
  React.useEffect(() => {
    document.documentElement.style.setProperty("--serif", `"${t.serifDisplay}", "Cormorant Garamond", Times, serif`);
    // Also load the font if not preloaded
    const id = "tweak-font-" + t.serifDisplay.replace(/\W/g, "");
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(t.serifDisplay)}:ital@0;1&display=swap`;
      document.head.appendChild(link);
    }
  }, [t.serifDisplay]);

  return (
    <>
      <TopBar />
      <Hero />
      <OfferBand />
      <InteriorSection />
      <ExteriorSection />
      <Process />
      <WhyUs />
      <Gallery />
      <TrustStrip />
      <FAQ />
      <FinalCTA />
      <Footer />
      <MobileCTA />

      <TweaksPanel title="Tweaks · Painting LP">
        <TweakSection label="Palette">
          <TweakRadio label="Theme" value={t.palette}
            options={PALETTES.map(p => ({ value: p.id, label: p.label.split(" ")[0] }))}
            onChange={(v) => setTweak("palette", v)} />
          <TweakColor label="Swatch preview" value={PALETTES.find(p => p.id === t.palette)?.swatch || PALETTES[0].swatch}
            options={PALETTES.map(p => p.swatch)}
            onChange={(v) => {
              const found = PALETTES.find(p => p.swatch[0] === v[0]);
              if (found) setTweak("palette", found.id);
            }} />
        </TweakSection>

        <TweakSection label="Display type">
          <TweakSelect label="Serif" value={t.serifDisplay}
            options={[
              "Instrument Serif",
              "Newsreader",
              "Source Serif 4",
              "DM Serif Display",
              "Cormorant Garamond",
              "EB Garamond",
              "Playfair Display",
            ]}
            onChange={(v) => setTweak("serifDisplay", v)} />
        </TweakSection>

        <TweakSection label="Copy">
          <TweakText label="Hook line" value={t.hookLine}
            placeholder="Walls done quietly, properly, once."
            onChange={(v) => setTweak("hookLine", v)} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
