const btnLight = document.getElementById('btn-light');
const btnPutOut = document.getElementById('btn-putout');
const lastAction = document.getElementById('last-action');
const totalLogs = document.getElementById('total-logs');
const logOutput = document.getElementById('log-output');


async function refreshLogs() {
  try {
    const text = await window.electronAPI.readLogs();
    logOutput.textContent = text;
    const lines = text.trim() ? text.trim().split('\n') : [];
    totalLogs.textContent = lines.length;
    lastAction.textContent = lines.length ? lines[lines.length - 1] : '—';
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


// initialize
refreshLogs();