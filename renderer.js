const btnLight = document.getElementById('btn-light');
const btnPutOut = document.getElementById('btn-putout');
const btnClearDisplay = document.getElementById('btn-clear-display');
const lastAction = document.getElementById('last-action');
const totalLogs = document.getElementById('total-logs');
const logOutput = document.getElementById('log-output');

// Track how many logs to hide from display
let hiddenLogCount = 0;

async function refreshLogs() {
  try {
    const text = await window.electronAPI.readLogs();
    const allLines = text.trim() ? text.trim().split('\n') : [];
    
    // Only show logs after the hidden ones
    const visibleLines = allLines.slice(hiddenLogCount);
    
    logOutput.textContent = visibleLines.join('\n');
    totalLogs.textContent = visibleLines.length;
    lastAction.textContent = visibleLines.length ? visibleLines[visibleLines.length - 1] : '—';
  } catch (e) {
    console.error(e);
  }
}

btnLight.addEventListener('click', async () => {
  const entry = await window.electronAPI.logEvent('LIGHT');
  await refreshLogs();
});

btnPutOut.addEventListener('click', async () => {
  const entry = await window.electronAPI.logEvent('PUT_OUT');
  await refreshLogs();
});

// Clear display button 
btnClearDisplay.addEventListener('click', async () => {
  try {
    const text = await window.electronAPI.readLogs();
    const allLines = text.trim() ? text.trim().split('\n') : [];
    
    // Remember how many logs exist now, so we can hide them
    hiddenLogCount = allLines.length;
    
    // Clear the display
    logOutput.textContent = '';
    lastAction.textContent = '—';
    totalLogs.textContent = '0';
  } catch (e) {
    console.error(e);
  }
});

// initialize
refreshLogs();