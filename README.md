# Rasta — landing

Rasta (avto-qismlar doʻkonlari uchun sotuv, qoldiq va nasiya hisobi) tanishtiruvchi sahifasi.

- **Jonli:** https://aliumirovux.github.io/rasta-landing/
- **Ilova:** https://aliumirovux.github.io/rasta/ · kod: https://github.com/aliumirovux/rasta

## Tuzilma

```
index.html        — markup (JSON-LD bilan)
css/styles.css    — @font-face + tokenlar + layout + responsive + motion
js/main.js        — TELEGRAM_URL sozlamasi, reveal, nav, mobil menyu, sticky CTA, FAQ
fonts/            — Golos Text 400/500/600/700 (latin + kirill), self-hosted
img/              — ilova skrinshotlari (webp) + og-image.png
icon.svg · icon-192.png
```

- Telegram havolasi — `js/main.js` boshidagi `TELEGRAM_URL`.
- Shrift fayllarida cmap patch: `ʻ` (U+02BB) → `‘`, `ʼ` (U+02BC) → `’` glifi (Google'dagi Golos'da U+02BB yoʻq).
- Dizayn tokenlari ilovadagi `src/styles/tokens.css` bilan bir xil.

## Push (brauzer orqali, tokensiz)

GitHub web-upload papka yoʻlini saqlamaydi — har papka oʻz manziliga yuklanadi:

| Papka | Upload manzili |
|---|---|
| root (index.html, README.md, icon.svg, icon-192.png) | `https://github.com/aliumirovux/rasta-landing/upload/main` |
| `css/` | `…/upload/main/css` |
| `js/` | `…/upload/main/js` |
| `fonts/` | `…/upload/main/fonts` |
| `img/` | `…/upload/main/img` |

GitHub Pages: Settings → Pages → Deploy from a branch → `main` / root. Build ~1 daqiqa.
