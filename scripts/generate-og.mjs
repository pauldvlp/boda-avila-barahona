import sharp from 'sharp'
import { writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

// OG image: 1200 × 630 px
const W = 1200
const H = 630

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <!-- Background gradient -->
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f8f9fc"/>
      <stop offset="100%" stop-color="#edf1fa"/>
    </linearGradient>
    <!-- Soft vignette -->
    <radialGradient id="vig" cx="50%" cy="50%" r="70%">
      <stop offset="60%" stop-color="transparent"/>
      <stop offset="100%" stop-color="#c5cfe6" stop-opacity="0.25"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#vig)"/>

  <!-- Outer border frame -->
  <rect x="24" y="24" width="${W - 48}" height="${H - 48}" fill="none" stroke="#c9a86c" stroke-width="1" opacity="0.5"/>
  <rect x="32" y="32" width="${W - 64}" height="${H - 64}" fill="none" stroke="#c9a86c" stroke-width="0.5" opacity="0.3"/>

  <!-- Corner ornaments — top left -->
  <path d="M24,24 L90,24 M24,24 L24,90" stroke="#c9a86c" stroke-width="2" fill="none"/>
  <path d="M24,24 Q57,57 90,24" stroke="#c9a86c" stroke-width="1" fill="none" opacity="0.5"/>
  <!-- Corner ornaments — top right -->
  <path d="M${W - 24},24 L${W - 90},24 M${W - 24},24 L${W - 24},90" stroke="#c9a86c" stroke-width="2" fill="none"/>
  <path d="M${W - 24},24 Q${W - 57},57 ${W - 90},24" stroke="#c9a86c" stroke-width="1" fill="none" opacity="0.5"/>
  <!-- Corner ornaments — bottom left -->
  <path d="M24,${H - 24} L90,${H - 24} M24,${H - 24} L24,${H - 90}" stroke="#c9a86c" stroke-width="2" fill="none"/>
  <path d="M24,${H - 24} Q57,${H - 57} 90,${H - 24}" stroke="#c9a86c" stroke-width="1" fill="none" opacity="0.5"/>
  <!-- Corner ornaments — bottom right -->
  <path d="M${W - 24},${H - 24} L${W - 90},${H - 24} M${W - 24},${H - 24} L${W - 24},${H - 90}" stroke="#c9a86c" stroke-width="2" fill="none"/>
  <path d="M${W - 24},${H - 24} Q${W - 57},${H - 57} ${W - 90},${H - 24}" stroke="#c9a86c" stroke-width="1" fill="none" opacity="0.5"/>

  <!-- 4-pointed star helper: M cx,cy-r  L cx+r*0.22,cy-r*0.22  L cx+r,cy  L cx+r*0.22,cy+r*0.22  L cx,cy+r  L cx-r*0.22,cy+r*0.22  L cx-r,cy  L cx-r*0.22,cy-r*0.22  Z -->

  <!-- Stars top -->
  <path d="M600,74 L606.6,80.6 L620,87.2 L606.6,80.6 L600,100 L593.4,80.6 L580,87.2 L593.4,80.6 Z" fill="#c9a86c"/>

  <!-- Divider lines + star center -->
  <line x1="200" y1="117" x2="564" y2="117" stroke="#c9a86c" stroke-width="1" opacity="0.5"/>
  <path d="M600,108 L603.3,113.7 L610,117 L603.3,120.3 L600,126 L596.7,120.3 L590,117 L596.7,113.7 Z" fill="#c9a86c"/>
  <line x1="636" y1="117" x2="${W - 200}" y2="117" stroke="#c9a86c" stroke-width="1" opacity="0.5"/>

  <!-- "Con la bendición de Dios y sus familias" -->
  <text x="600" y="100" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="18" fill="#4d5f8a" letter-spacing="3">CON LA BENDICIÓN DE DIOS Y SUS FAMILIAS</text>

  <!-- Names -->
  <text x="600" y="270" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="112" fill="#c9a86c" font-style="italic">Carlos &amp; Cherly</text>

  <!-- "Se unen en Matrimonio" -->
  <text x="600" y="330" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="26" fill="#1a2744" letter-spacing="4">SE UNEN EN MATRIMONIO</text>

  <!-- Divider -->
  <line x1="250" y1="368" x2="540" y2="368" stroke="#c9a86c" stroke-width="1" opacity="0.5"/>
  <path d="M600,358 L605.5,363.5 L614,368 L605.5,372.5 L600,378 L594.5,372.5 L586,368 L594.5,363.5 Z" fill="#c9a86c"/>
  <line x1="660" y1="368" x2="950" y2="368" stroke="#c9a86c" stroke-width="1" opacity="0.5"/>

  <!-- Date -->
  <text x="600" y="430" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="42" fill="#c9a86c" letter-spacing="8" font-weight="500">18 · ABRIL · 2026</text>

  <!-- Venue -->
  <text x="600" y="488" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="19" fill="#4d5f8a" letter-spacing="3">CENTRO DE DÍA INJUPEMP · TEGUCIGALPA, HONDURAS</text>

  <!-- Bottom divider -->
  <line x1="300" y1="524" x2="564" y2="524" stroke="#c9a86c" stroke-width="0.8" opacity="0.4"/>
  <path d="M600,516 L603.3,521.7 L610,524 L603.3,526.3 L600,532 L596.7,526.3 L590,524 L596.7,521.7 Z" fill="#c9a86c" opacity="0.7"/>
  <line x1="636" y1="524" x2="900" y2="524" stroke="#c9a86c" stroke-width="0.8" opacity="0.4"/>

  <!-- Verse -->
  <text x="600" y="566" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="16" fill="#4d5f8a" font-style="italic" opacity="0.8">"Todo lo hizo hermoso en su tiempo" — Eclesiastés 3:11</text>
</svg>`

mkdirSync(join(root, 'public'), { recursive: true })

await sharp(Buffer.from(svg))
  .png({ quality: 95 })
  .toFile(join(root, 'public', 'og-image.png'))

console.log('✓ og-image.png generado (1200×630)')
