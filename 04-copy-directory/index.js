const fs = require('fs');
const path = require('path');

const copyDir = () => {
  const folderPath = path.join(__dirname, 'files');
  const copyFolderPath = path.join(__dirname, 'files-copy');

  fs.mkdir(copyFolderPath, { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }

    fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
      if (err) {
        console.log(err);
      }

      for (const file of files) {
        if (file.isFile() === true) {
          const filePath = path.resolve(folderPath, file.name);
          const copyFilePath = path.resolve(copyFolderPath, file.name);
          fs.copyFile(filePath, copyFilePath, (err) => {
            if (err) {
              console.log(err);
            }
          });
        }
      }
    });
  });
};

copyDir();
