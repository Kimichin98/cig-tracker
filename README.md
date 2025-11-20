# Cigarette Tracker

A simple desktop application to log and track cigarette usage, built with Electron.

![Project Status](https://img.shields.io/badge/status-active-brightgreen) ![Electron](https://img.shields.io/badge/Electron-2.0.0-blue) ![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey)

## 📋 What It Does

- **🚬 Event Logging** - Click "Light Cigarette" or "Put Out Cigarette" to log events
- **📊 Activity Tracking** - Shows your last action and total log count
- **🕒 Timestamped Logs** - Displays recent logs with detailed timestamps
- **🎯 System Tray Integration** - Runs in system tray when minimized
- **💾 Local Storage** - Saves all data to a local text file automatically

## 🚀 Quick Start

### Installation
```bash
npm install
Running the Application
bash
npm start
🔨 Building
To create a distributable installer:

bash
npm run dist
The executable installer (.exe on Windows) will be generated in the dist folder.

🗂️ Project Structure
text
cig-tracker/
├── main.js          # Main process (window, tray, IPC handlers)
├── tracker.js       # Log file reading/writing operations
├── preload.js       # Exposes IPC methods to renderer securely
├── renderer.js      # UI interactions and updates
├── index.html       # Application interface
├── styles.css       # Styling and layout
└── assets/
    └── tray.png     # System tray icon
💾 Data Storage
Logs are automatically saved to a text file in your system's app data directory:

Windows:

text
C:\Users\YourUsername\AppData\Roaming\cig-tracker\cigarette-logs.txt
macOS:

text
~/Library/Application Support/cig-tracker/cigarette-logs.txt
Linux:

text
~/.config/cig-tracker/cigarette-logs.txt
Log Format
Each entry includes:

Precise timestamp in CST timezone

Event type (LIGHT or PUT_OUT)

Automatic newline separation

⚙️ Features
Display Management
Clear Display - Hides old logs from UI without deleting from file

Persistent Data - All logs remain in file and reappear on app restart

Real-time Updates - Interface updates immediately on user actions

Security
Context isolation enabled for enhanced security

Secure IPC communication between processes

📝 Notes & Best Practices
Git Ignore - node_modules/ and dist/ folders are excluded from version control

Assets Required - Ensure assets/tray.png exists for proper tray functionality

Dependencies - All required packages are included in package.json

🔧 Troubleshooting
Common Issues & Solutions
Issue	Solution
Buttons not working	Verify preload.js exists and is properly loaded in main.js
Can't find log files	Check console output - app prints exact file path on startup
Build failures	Delete dist folder, ensure no "Cig tracker" processes are running
Installation problems	Uninstall existing app version and retry build process
Development Tips
Check browser developer tools (F12) for runtime errors

Monitor console output for file path information

Ensure all asset paths are correct in the code

🛠️ Technical Details
Framework: Electron

Language: JavaScript

Storage: Local file system

Security: Context isolation enabled

Platform: Cross-platform (Windows, macOS, Linux)

Repository: https://github.com/Kimichin98/cig-tracker

⚠️ Note: This application is designed for personal tracking purposes. Please use responsibly.