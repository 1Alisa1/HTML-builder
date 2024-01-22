const fs = require('fs');
const path = require('path');

const bundleFilePath = path.join(__dirname, 'project-dist');
const htmlFilePath = path.join(__dirname, 'template.html');
const bundleHtmlPath = path.join(bundleFilePath, 'index.html');
const stylesFolderPath = path.join(__dirname, 'styles');
const bundleStylePath = path.join(bundleFilePath, 'style.css');
const componentsFolderPath = path.join(__dirname, 'components');
const assetsFolderPath = path.join(__dirname, 'assets');
const copyAssetsFolderPath = path.join(bundleFilePath, 'assets');

const stylesArr = [];

const copyDir = (inputDir, outputDir) => {
  fs.readdir(inputDir, { withFileTypes: true }, (err, files) => {
    fs.mkdir(outputDir, { recursive: true }, (err) => {
      if (err) {
        console.log(err);
      }

      files.forEach((file) => {
        const inputPath = path.join(inputDir, file.name);
        const outputPath = path.join(outputDir, file.name);

        if (file.isDirectory()) {
          copyDir(inputPath, outputPath);
        } else {
          fs.copyFile(inputPath, outputPath, (err) => {
            if (err) {
              console.log(err);
            }
          });
        }
      });
    });
  });
};

fs.mkdir(bundleFilePath, { recursive: true }, (err) => {
  if (err) {
    return err;
  }

  fs.readdir(componentsFolderPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      return err;
    }

    fs.readFile(htmlFilePath, 'utf-8', (err, dataHtml) => {
      if (err) {
        return err;
      }

      for (const file of files) {
        const fileExtension = path.extname(file.name);

        if (file.isFile() === true && fileExtension === '.html') {
          const filePath = path.resolve(componentsFolderPath, file.name);

          fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
              return err;
            }

            const fileName = path.parse(filePath).name;

            dataHtml = dataHtml.replace(`{{${fileName}}}`, data);

            const output = fs.createWriteStream(bundleHtmlPath);
            output.write(dataHtml);
          });
        }
      }
    });
  });

  fs.readdir(stylesFolderPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.log(err);
    }

    for (const file of files) {
      const fileExtension = path.extname(file.name);

      if (file.isFile() === true && fileExtension === '.css') {
        const filePath = path.resolve(stylesFolderPath, file.name);

        fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) {
            console.log(err);
          }

          stylesArr.push(data);

          const output = fs.createWriteStream(bundleStylePath);
          output.write(stylesArr.join('\n'));
        });
      }
    }
  });

  copyDir(assetsFolderPath, copyAssetsFolderPath);
});
