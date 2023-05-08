const fs = require("fs");
const path = require("path");

fs.writeFile(path.join(__dirname, "project-dist", "bundle.css"),"",(err)=>{});

fs.readdir(path.join(__dirname, "styles"), (err,data) =>{
    data.forEach(file => {
        if(file.split(".")[1] === "css"){
            fs.readFile(path.join(__dirname, "styles", file),(err,data) =>{
                fs.appendFile(path.join(__dirname, "project-dist", "bundle.css"), data,(err) => {});
            });
        }
    });
});
