const fs = require('node:fs');
const path = require('node:path');

const filePath = path.join(__dirname, 'text.txt');

const readableStream = fs.createReadStream(filePath, 'utf-8');
readableStream.on('data', (chunk) => console.log(chunk));
