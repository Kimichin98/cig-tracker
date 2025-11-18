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
return `${now.toISOString()} \t ${type}\n`;
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