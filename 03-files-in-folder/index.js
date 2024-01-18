const path = require('path');
const fs = require('fs/promises');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true })
  .then(async (files) => {
    for (const file of files) {
      if (file.isFile() === true) {
        const filePath = path.resolve(folderPath, file.name);
        const parsedFilePath = path.parse(filePath);
        const fileStats = await fs.stat(filePath);
        const fileName = parsedFilePath.name;
        const fileExtension = parsedFilePath.ext.slice(1);
        const fileSize = fileStats.size / 1000;

        console.log(`${fileName} - ${fileExtension} - ${fileSize}kb`);
      }
    }
  })
  .catch((err) => console.log(err));
