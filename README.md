# Cigarette Tracker

A simple desktop app to log and track cigarette usage. Built with Electron.

## What it does

- Click "Light Cigarette" or "Put Out Cigarette" to log events
- Shows your last action and total log count
- Displays recent logs with timestamps
- Runs in the system tray when minimized
- Saves everything to a local text file

## Setup
```bash
npm install
npm start
```

## Building

To create an installer:
```bash
npm run dist
```

The `.exe` installer will be in the `dist` folder.

## How it works

Logs are saved to a text file in your app data folder. On Windows, that's usually:
```
C:\Users\YourUsername\AppData\Roaming\cig-tracker\cigarette-logs.txt
```

Each log includes a timestamp in CST and the event type (LIGHT or PUT_OUT).

The "Clear Display" button hides old logs from the UI without deleting them from the file. They'll show up again if you restart the app.

## Files

- `main.js` - Main process stuff (window, tray, IPC handlers)
- `tracker.js` - Handles reading/writing to the log file
- `preload.js` - Exposes IPC methods to the renderer
- `renderer.js` - Button clicks and UI updates
- `index.html` - The interface
- `styles.css` - Makes it look decent

## Notes

- Don't commit `node_modules/` or `dist/` to git - these files are added to .gitignore but still
- The tray icon needs `assets/tray.png` to work properly
- Uses context isolation for better security

## Common issues

**Buttons don't work**: Make sure `preload.js` exists and is properly loaded in `main.js`

**Can't find logs**: Check the console output when you run the app - it prints the exact file path

**Build fails**: Delete the `dist` folder and try again, make sure no "Cig tracker" processes are running
and uninstall the App if needed.