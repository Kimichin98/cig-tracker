const fs = require('fs');

class Tracker {
  constructor(filePath) {
    this.filePath = filePath;
    // Ensure file exists
    try {
      if (!fs.existsSync(this.filePath)) {
        fs.writeFileSync(this.filePath, '', { encoding: 'utf8' });
      }
    } catch (e) {
      console.error('Failed creating log file', e);
    }
  }

  formatEntry(type) {
    const now = new Date();
    
    // Format date in CST timezone
    const options = {
      timeZone: 'America/Chicago', // CST/CDT timezone
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    
    const formattedDate = now.toLocaleString('en-US', options);
    return `${formattedDate} \t ${type}\n`;
  }

  log(type) {
    const line = this.formatEntry(type);
    try {
      fs.appendFileSync(this.filePath, line, { encoding: 'utf8' });
    } catch (e) {
      console.error('Error writing log', e);
    }
    return line;
  }

  readAll() {
    try {
      return fs.readFileSync(this.filePath, { encoding: 'utf8' });
    } catch (e) {
      return '';
    }
  }
}

module.exports = Tracker;