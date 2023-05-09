const fs = require("fs");
const path = require("path");

fs.rmdir(path.join(__dirname, "files-copy"), { recursive: true }, (err) => {});
fs.mkdir(path.join(__dirname, "files-copy"), { recursive: true }, (err) => {});

fs.readdir(
  path.join(__dirname, "files"),
  { withFileTypes: true },
  (err, data) => {
    data.forEach((file) => {
      fs.copyFile(
        path.join(__dirname, "files", file.name),
        path.join(__dirname, "files-copy", file.name),
        (err) => {}
      );
    });
  }
);
