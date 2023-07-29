const fs = require('fs');
const path = require('path');
const multer = require('multer');

const readFileAsync = (filename) => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, '..');

    fs.readFile(filePath + "/" + filename, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (parseError) {
          reject(parseError);
        }
      }
    });
  });
};

const readStorage = () => {
  const filePath = path.join(__dirname, '..');
  const storage = multer.diskStorage({
    destination: path.join(filePath, 'images'),
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage });
  return upload;
}

module.exports = {
  readFileAsync,
  readStorage,
};
