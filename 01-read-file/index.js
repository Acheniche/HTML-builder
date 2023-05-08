const fs = require('fs');
const path = require('path');

const FileRead = fs.ReadStream(path.join(__dirname,"text.txt"), "utf-8");
FileRead.on("data", function(data){
    console.log(data);
});
