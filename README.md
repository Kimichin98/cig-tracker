# Cigarette Tracker

## Setup

1. Install Node (14+ recommended)
2. Clone the repo
3. Run `npm install`
4. Run `npm run start` to start in dev mode

## Build a Windows executable

Install the required dev deps (should be in package.json). Then run:

npm run dist

This uses electron-builder and will create an installer in the `dist/` folder.

The tracker writes to the app's `userData` folder (platform specific) — this avoids needing elevated privileges or writing to random places.