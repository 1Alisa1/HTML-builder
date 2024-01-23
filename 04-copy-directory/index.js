const fs = require('fs');
const path = require('path');

const copyDir = () => {
  const folderPath = path.join(__dirname, 'files');
  const copyFolderPath = path.join(__dirname, 'files-copy');

  const copyFiles = () => {
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
  };

  fs.mkdir(copyFolderPath, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
    }

    fs.readdir(copyFolderPath, { withFileTypes: true }, (err, files) => {
      let count = 0;

      if (files.length === 0) {
        copyFiles();
      }

      for (const file of files) {
        const filePath = path.join(copyFolderPath, file.name);

        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
          }

          count += 1;

          if (count === files.length - 1) {
            copyFiles();
          }
        });
      }
    });
  });
};

copyDir();
