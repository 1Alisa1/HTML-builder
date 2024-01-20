const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'styles');
const bundleFilePath = path.join(__dirname, 'project-dist', 'bundle.css');

const arr = [];

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log(err);
  }

  for (const file of files) {
    const fileExtension = path.extname(file.name);

    if (file.isFile() === true && fileExtension === '.css') {
      const filePath = path.resolve(folderPath, file.name);

      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.log(err);
        }

        arr.push(data);

        const output = fs.createWriteStream(bundleFilePath);
        output.write(arr.join('\n'));
      });
    }
  }
});
