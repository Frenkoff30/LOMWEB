# Lom Srní — návrh nového webu

Redesign webu [lomsrni-cz.webnode.cz](https://lomsrni-cz.webnode.cz/) — moderní, immersivní jednostránkový web
v modré paletě „hluboké vody". Zachovává původní strukturu (Úvod, O nás, Služby, Návštěvní řád,
Aktuality, Fotogalerie, Kontakt) jako plynule scrollovatelné sekce.

## Spuštění

Web je čisté HTML/CSS/JS bez build kroku. Stačí otevřít `index.html` v prohlížeči,
nebo lokálně naservírovat:

```bash
python -m http.server 8123
# → http://localhost:8123
```

## Struktura

```
LOMWEB/
├─ index.html        # celá stránka (všechny sekce)
├─ css/style.css     # design systém + komponenty + responzivita
├─ js/main.js        # menu, scroll-reveal, scrollspy, bublinky, formulář
├─ assets/favicon.svg
└─ README.md
```

## Design

- **Paleta:** primární `#0EA5E9`, cyan `#38BDF8`, hloubková navy `#062A3D`/`#04161F`, akcent oranžová `#F97316`
- **Písmo:** Space Grotesk (nadpisy) + Inter (text) — plná podpora české diakritiky
- **Styl:** Motion-driven — animované světelné paprsky a bublinky ve vodě, scroll-reveal, parallax, glassmorphism navigace
- Respektuje `prefers-reduced-motion` a základní přístupnost (skip link, focus stavy, ARIA)

## Co je potřeba ještě doplnit (placeholdery)

- [ ] **Fotky** — sekce Služby a Fotogalerie mají designované placeholdery; stačí vložit reálné fotky lomu/kempu/ponorů.
- [ ] **Ceník** — ceny jsou orientační podle sezóny 2026 z původního webu; ověřit aktuální sazby.
- [ ] **Návštěvní řád** — jsou tu 4 základní pravidla; doplnit plné znění.
- [ ] **Kontaktní formulář** — zatím demo (neodesílá); napojit na e-mail (např. Formspree) při spuštění.

## Nasazení

Vhodné pro GitHub Pages — repo `Frenkoff30/LOMWEB`, v nastavení zapnout Pages z větve `main` (kořen).
