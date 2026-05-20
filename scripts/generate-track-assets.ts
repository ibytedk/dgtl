import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { gtr2Tracks } from "../src/lib/gtr2-tracks";

const outputDir = resolve(process.cwd(), "public/images/tracks");
const sourceMapDir = resolve(process.cwd(), "public/images/track-map-sources");
const igcdMapDir = resolve(sourceMapDir, "igcd");

const sourceMapBySlug: Record<string, string> = {
  "anderstorp-2003": "anderstorp.png",
  "barcelona-2003": "barcelona-catalunya.png",
  "brno-2003": "brno.png",
  "brno-2004": "brno.png",
  "donington-park-2003": "donington-gp.png",
  "donington-park-2004": "donington-gp.png",
  "donington-park-national": "donington-national.png",
  "dubai-club": "dubai-club.png",
  "dubai-2004": "dubai-gp.png",
  "dubai-international": "dubai-international.png",
  "dubai-national": "dubai-national.png",
  "enna-pergusa-2003": "enna-pergusa.png",
  "estoril-2003": "estoril.png",
  "hockenheim-2004": "hockenheim-gp.png",
  imola: "imola.png",
  "magny-cours-2003": "magny-cours.png",
  "magny-cours-2004": "magny-cours.png",
  "monza-2003": "monza.png",
  "monza-2004": "monza.png",
  "oschersleben-2003": "oschersleben.png",
  "oschersleben-2004": "oschersleben.png",
  "spa-2003": "spa.png",
  "spa-2004": "spa.png",
  "valencia-2004": "valencia.png",
  "valencia-long": "valencia.png",
  zhuhai: "zhuhai.png"
};

const trackMapPaths: Record<string, string> = {
  "anderstorp-2003":
    "M188 142 L444 116 C520 112 582 155 594 224 C606 292 553 327 482 310 C419 295 393 250 334 257 C266 265 193 250 172 203 C162 180 166 157 188 142 Z",
  "anderstorp-south":
    "M205 151 L408 130 C487 122 548 158 557 217 C567 278 508 309 430 292 C366 278 339 238 286 244 C226 251 178 225 178 190 C178 171 187 158 205 151 Z",
  "barcelona-2003":
    "M196 253 C167 209 190 151 244 132 C304 111 351 152 409 139 C485 123 557 157 581 212 C612 283 533 323 462 299 C404 279 374 240 324 254 C264 272 219 287 196 253 Z",
  "barcelona-national":
    "M210 257 C174 218 192 164 247 145 C303 126 350 165 407 153 C479 138 539 169 552 219 C568 280 492 310 426 289 C376 273 351 239 310 252 C263 267 229 277 210 257 Z",
  "brno-2003":
    "M162 251 C127 202 167 135 236 126 C303 118 335 170 397 151 C469 129 557 154 589 213 C627 284 553 334 473 306 C405 282 385 230 326 247 C252 269 191 293 162 251 Z",
  "brno-2004":
    "M162 251 C127 202 167 135 236 126 C303 118 335 170 397 151 C469 129 557 154 589 213 C627 284 553 334 473 306 C405 282 385 230 326 247 C252 269 191 293 162 251 Z",
  "donington-park-2003":
    "M185 168 C244 108 346 119 379 175 C414 235 493 185 552 223 C616 264 585 323 504 319 C421 315 385 268 326 288 C245 316 162 264 162 211 C162 193 169 178 185 168 Z M475 318 C512 365 585 344 584 291",
  "donington-park-2004":
    "M185 168 C244 108 346 119 379 175 C414 235 493 185 552 223 C616 264 585 323 504 319 C421 315 385 268 326 288 C245 316 162 264 162 211 C162 193 169 178 185 168 Z M475 318 C512 365 585 344 584 291",
  "donington-park-national":
    "M185 168 C244 108 346 119 379 175 C414 235 493 185 552 223 C600 254 589 307 520 313 C430 321 388 270 326 288 C245 316 162 264 162 211 C162 193 169 178 185 168 Z",
  "dubai-club":
    "M230 160 L438 130 C507 121 558 160 555 220 C552 283 487 307 416 286 C349 267 327 228 275 238 C221 249 185 225 191 190 C194 173 207 164 230 160 Z",
  "dubai-2004":
    "M169 281 L169 158 L291 117 L522 135 C576 139 610 174 607 224 C604 279 548 314 473 303 L316 272 L241 323 C202 349 169 329 169 281 Z M292 117 C343 177 382 189 449 170",
  "dubai-international":
    "M178 279 L178 160 L300 127 L506 143 C561 148 590 181 585 224 C578 279 520 305 454 291 L319 263 L245 315 C206 342 178 324 178 279 Z",
  "dubai-national":
    "M190 267 L190 165 L306 137 L482 151 C531 155 562 184 555 224 C547 272 495 292 438 278 L318 256 L250 301 C215 324 190 310 190 267 Z",
  "enna-pergusa-2003":
    "M167 219 C167 152 246 113 361 113 C484 113 571 154 571 219 C571 286 488 324 361 324 C239 324 167 286 167 219 Z M253 130 L293 164 M463 128 L426 164 M544 250 L491 243 M247 306 L286 273",
  "estoril-2003":
    "M187 151 C236 110 324 117 378 152 C438 191 497 145 555 190 C611 233 586 309 513 323 C441 337 399 285 341 294 C260 306 188 266 169 210 C160 184 168 164 187 151 Z",
  "hockenheim-2004":
    "M166 274 L166 159 C166 127 193 111 229 121 L523 207 C578 223 602 270 573 303 C542 339 478 323 421 287 L311 218 L231 305 C200 338 166 318 166 274 Z",
  "hockenheim-national":
    "M190 271 L190 161 C190 130 218 119 252 134 L459 216 C516 239 522 288 478 309 C429 333 374 295 320 253 L243 311 C213 334 190 315 190 271 Z",
  "hockenheim-short":
    "M228 264 L228 162 C228 133 253 126 284 142 L421 212 C472 238 473 287 428 307 C381 328 335 294 291 255 L249 295 C236 307 228 292 228 264 Z",
  imola:
    "M513 121 C586 160 592 241 532 271 C469 303 423 257 373 286 C318 319 217 295 184 234 C150 171 203 111 279 128 C344 143 389 87 513 121 Z",
  "magny-cours-2003":
    "M190 260 C151 212 185 140 256 128 C333 115 369 167 431 149 C500 130 573 164 591 221 C614 291 537 327 469 302 C417 283 391 240 339 255 C278 273 218 294 190 260 Z",
  "magny-cours-2004":
    "M190 260 C151 212 185 140 256 128 C333 115 369 167 431 149 C500 130 573 164 591 221 C614 291 537 327 469 302 C417 283 391 240 339 255 C278 273 218 294 190 260 Z",
  "magny-cours-national":
    "M213 254 C176 215 199 154 260 143 C327 131 363 175 421 159 C482 143 539 174 548 222 C560 283 494 307 438 287 C390 270 365 239 321 252 C273 267 235 277 213 254 Z",
  "monza-2003":
    "M210 139 C316 97 511 126 558 205 C608 287 520 338 397 318 C311 304 216 261 185 205 C169 177 182 151 210 139 Z M191 204 L242 196 M513 144 L485 180 M503 316 L462 281",
  "monza-2004":
    "M210 139 C316 97 511 126 558 205 C608 287 520 338 397 318 C311 304 216 261 185 205 C169 177 182 151 210 139 Z M191 204 L242 196 M513 144 L485 180 M503 316 L462 281",
  "monza-junior":
    "M244 158 C329 124 462 145 500 205 C539 267 468 307 374 292 C296 280 236 243 218 201 C208 179 220 166 244 158 Z",
  "oschersleben-2003":
    "M175 213 C166 150 236 118 319 141 C381 158 415 117 501 143 C588 169 613 245 557 292 C501 338 427 292 367 300 C279 313 185 286 175 213 Z",
  "oschersleben-2004":
    "M175 213 C166 150 236 118 319 141 C381 158 415 117 501 143 C588 169 613 245 557 292 C501 338 427 292 367 300 C279 313 185 286 175 213 Z",
  "spa-2003":
    "M204 250 C170 206 192 153 253 142 C324 130 386 149 430 176 C472 201 521 190 563 216 C612 246 601 291 551 306 C496 322 442 287 376 296 C303 306 237 292 204 250 Z",
  "spa-2004":
    "M204 250 C170 206 192 153 253 142 C324 130 386 149 430 176 C472 201 521 190 563 216 C612 246 601 291 551 306 C496 322 442 287 376 296 C303 306 237 292 204 250 Z",
  "valencia-2004":
    "M178 241 C150 174 216 119 300 132 C380 145 411 102 498 132 C581 160 612 235 565 286 C518 337 436 301 371 307 C292 315 200 294 178 241 Z",
  "valencia-long":
    "M178 241 C150 174 216 119 300 132 C380 145 411 102 498 132 C581 160 612 235 565 286 C518 337 436 301 371 307 C292 315 200 294 178 241 Z",
  "valencia-national":
    "M201 238 C176 185 227 143 301 151 C368 158 398 124 470 151 C534 176 558 233 521 273 C483 315 417 286 365 291 C297 297 222 282 201 238 Z",
  zhuhai:
    "M171 268 L171 170 C171 134 203 120 243 137 L513 244 C570 266 588 309 550 331 C514 351 452 328 397 302 L285 249 L224 304 C194 331 171 313 171 268 Z"
};

const accents = ["#f04b37", "#ffd15f", "#19c6b7", "#5f63ff", "#ffffff"];

function hash(value: string) {
  return Array.from(value).reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function sourceMapMarkup(slug: string) {
  const fileName = sourceMapBySlug[slug];

  if (!fileName) {
    return null;
  }

  const filePath = resolve(sourceMapDir, fileName);

  if (!existsSync(filePath)) {
    return null;
  }

  const base64 = readFileSync(filePath).toString("base64");

  return `
    <rect x="112" y="74" width="496" height="218" rx="4" fill="#f4f6f8" opacity="0.96"/>
    <image href="data:image/png;base64,${base64}" x="124" y="82" width="472" height="202" preserveAspectRatio="xMidYMid meet"/>
  `;
}

function igcdMapMarkup(slug: string) {
  const filePath = resolve(igcdMapDir, `${slug}.jpg`);

  if (!existsSync(filePath)) {
    return null;
  }

  const base64 = readFileSync(filePath).toString("base64");

  return `
    <rect x="96" y="70" width="528" height="226" rx="4" fill="#05070d" opacity="0.96"/>
    <image href="data:image/jpeg;base64,${base64}" x="108" y="82" width="504" height="196" preserveAspectRatio="xMidYMid meet"/>
    <text x="612" y="290" fill="#cbd6df" font-family="Arial Narrow, Arial, sans-serif" font-size="11" font-weight="800" text-anchor="end" letter-spacing="1.4">IN-GAME MAP / IGCD</text>
  `;
}

mkdirSync(outputDir, { recursive: true });

for (const track of gtr2Tracks) {
  const seed = hash(track.slug);
  const path = trackMapPaths[track.slug];
  const accent = accents[seed % accents.length];
  const secondary = accents[(seed + 2) % accents.length];
  const cornerLabel = track.data.corners ? `${track.data.corners} sving` : "layout";
  const embeddedMap = igcdMapMarkup(track.slug) ?? sourceMapMarkup(track.slug);

  if (!path) {
    throw new Error(`Missing track map path for ${track.slug}`);
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="420" viewBox="0 0 720 420" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(track.name)}</title>
  <desc id="desc">Original DGTL track-map silhouette for ${escapeXml(track.data.location)} based on verified layout references.</desc>
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#07111f"/>
      <stop offset="0.5" stop-color="#0d2231"/>
      <stop offset="1" stop-color="#05070d"/>
    </linearGradient>
    <linearGradient id="speed" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="${accent}" stop-opacity="0"/>
      <stop offset="0.45" stop-color="${accent}" stop-opacity="0.8"/>
      <stop offset="1" stop-color="${secondary}" stop-opacity="0.15"/>
    </linearGradient>
    <filter id="glow" x="-25%" y="-25%" width="150%" height="150%">
      <feGaussianBlur stdDeviation="7" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect width="720" height="420" fill="url(#bg)"/>
  <path d="M-30 332 L760 168" stroke="url(#speed)" stroke-width="72" opacity="0.28"/>
  <path d="M-20 354 L760 208" stroke="${accent}" stroke-width="7" opacity="0.72"/>
  <path d="M-20 374 L760 246" stroke="#ffd15f" stroke-width="4" opacity="0.58"/>
  <g opacity="0.24">
    <path d="M0 76 H720 M0 148 H720 M0 220 H720 M0 292 H720" stroke="#ffffff" stroke-width="1"/>
    <path d="M80 0 V420 M200 0 V420 M320 0 V420 M440 0 V420 M560 0 V420" stroke="#ffffff" stroke-width="1"/>
  </g>
  ${
    embeddedMap ??
    `<g>
      <path d="${path}" fill="none" stroke="#03060b" stroke-width="34" stroke-linecap="round" stroke-linejoin="round" opacity="0.64"/>
      <path d="${path}" fill="none" stroke="#f4f6f8" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" filter="url(#glow)"/>
      <path d="${path}" fill="none" stroke="${accent}" stroke-width="5" stroke-dasharray="34 24" stroke-linecap="round" stroke-linejoin="round"/>
    </g>`
  }
  <rect x="0" y="0" width="720" height="52" fill="#c70b17"/>
  <path d="M0 0 H88 L52 52 H0 Z" fill="#06111d"/>
  <text x="42" y="36" fill="#ffffff" font-family="Impact, Arial Black, sans-serif" font-size="34" font-style="italic" font-weight="100" letter-spacing="1">DGTL</text>
  <text x="612" y="32" fill="#fff1d1" font-family="Arial Narrow, Arial, sans-serif" font-size="13" font-weight="900" text-anchor="end" letter-spacing="2">TRACK FILE</text>
  <text x="34" y="333" fill="#ffffff" font-family="Impact, Arial Black, sans-serif" font-size="44" font-style="italic" font-weight="100" letter-spacing="1">${escapeXml(track.name.toUpperCase())}</text>
  <text x="36" y="361" fill="#ffd15f" font-family="Arial Narrow, Arial, sans-serif" font-size="18" font-weight="900" letter-spacing="2">${escapeXml(track.country.toUpperCase())} / ${track.lengthKm.toFixed(3)} KM / ${escapeXml(cornerLabel.toUpperCase())}</text>
  <text x="36" y="386" fill="#cbd6df" font-family="Arial Narrow, Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="1">${escapeXml(track.data.layout.toUpperCase())}</text>
</svg>`;

  writeFileSync(resolve(outputDir, `${track.slug}.svg`), svg, "utf8");
}
