# Emoji Copy & Paste

A free multilingual web app for finding emoji meanings and copying emojis instantly.

## Live app

- App: https://emoji.appsandgames.org/
- Project page: https://appsandgames.org/emoji-copy-paste
- Apps & Games: https://appsandgames.org/

## Features

- 261 curated emojis, custom heart faces and signs organized into eleven categories
- Search by emoji or meaning
- English, Croatian, German, Italian and Spanish interface
- Favorites, recently used emojis and multi-emoji collections
- Country flags displayed as images
- Flag-image copying for pasting real flag graphics into Microsoft Word
- Country-code labels and country-code search for every flag
- 40 common European traffic signs with multilingual descriptions and image copying
- 20 original red heart-face images covering joyful, loving, thoughtful and sad emotions
- Heart-face image copying for pasting the actual artwork into Microsoft Word
- Light and dark themes
- Responsive desktop and mobile layout
- Info & Support section with PayPal, Stripe and crypto donation options

## Development

Requirements:

- Node.js 22.13 or newer
- npm

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

For a production build:

```bash
npm run build
```

## Technology

React, TypeScript, Next.js, Vinext, Vite, Tailwind CSS and Cloudflare Workers.

Production is deployed automatically from the `main` branch through Cloudflare.

## Notes

Emoji appearance can vary by platform. Flag cards use FlagCDN images, traffic signs are rendered as vector graphics, and heart faces are original PNG artwork. All three can be copied into Word as images. The smaller Unicode copy action is shown only for traffic signs.

The Swiss no-overtaking sign (2.44) is sourced from the Federal Roads Office (ASTRA/FEDRO) via Wikimedia Commons and is in the public domain.

## Author

[Soldatix](https://github.com/Soldatix) — part of the [Apps & Games](https://appsandgames.org/) project.

Copyright © 2026 Soldatix. All rights reserved.
