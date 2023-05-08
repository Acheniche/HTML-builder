const fs = require("fs");
const path = require("path");

fs.mkdir(path.join(__dirname, "project-dist"), { recursive: true },(err)=>{});
fs.writeFile(path.join(__dirname, "project-dist", "index.html"),"",(err)=>{});
fs.writeFile(path.join(__dirname, "project-dist", "style.css"),"",(err)=>{});
fs.mkdir(path.join(__dirname, "project-dist", "assets"), { recursive: true },(err)=>{});

fs.readdir(path.join(__dirname, "assets"), (err,data) =>{
data.forEach((file) =>{
    fs.readdir(path.join(__dirname, "assets", file), (err,datas) =>{
        datas.forEach(nextfiles =>{
            fs.mkdir(path.join(__dirname, "project-dist", "assets", file), (err) => {});
            fs.copyFile(path.join(__dirname, "assets", file, nextfiles), path.join(__dirname, "project-dist", "assets", file, nextfiles),(err) =>{});
        })
    })
});
});

fs.readdir(path.join(__dirname, "styles"), (err,data) =>{
    data.forEach(file => {
        if(file.split(".")[1] === "css"){
            fs.readFile(path.join(__dirname, "styles", file),(err,data) =>{
                fs.appendFile(path.join(__dirname, "project-dist", "style.css"), data.toString(),(err) => {});
            });
        }
    });
});

fs.copyFile(path.join(__dirname, "template.html"), path.join(__dirname, "project-dist","index.html"), (err) =>{});
fs.readFile(path.join(__dirname, "project-dist", "index.html"), (err, template) => {
    fs.readdir(path.join(__dirname, "components"), (err,components) =>{
        for(const component of components){
            fs.readFile(path.join(__dirname, "components", component), (err,data) => {
                 template = template.toString().replace(`{{${path.parse(path.join(__dirname, "components", component.split(".")[0])).name}}}`, data.toString());
                    fs.writeFile(path.join(__dirname, "project-dist", "index.html"), template, (err) =>{})
            });
        }
    })
});
