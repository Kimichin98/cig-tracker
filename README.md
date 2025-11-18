# cig-tracker
Minimal, single user app that logs "Light" and "Put out" cigarette events with timestamps to a local logs.txt file. This document contains the full project structure and code needed to run and build a Windows .exe (using electron-builder).

Project structure - For now

cig-tracker/
├─ package.json
├─ main.js
├─ preload.js
├─ renderer.js
├─ tracker.js
├─ index.html
├─ styles.css
├─ logs.txt (created at runtime)
├─ .gitignore
└─ README.md