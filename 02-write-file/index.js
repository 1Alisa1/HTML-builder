const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const filePath = path.join(__dirname, 'text.txt');

const output = fs.createWriteStream(filePath);
stdout.write('Hello\n');

stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    process.exit();
  } else {
    output.write(data);
  }
});

process.on('exit', () => stdout.write('Goodbye!\n'));
process.on('SIGINT', () => process.exit());
