const fs = require("fs");
const path = require("path");
const promis = require('node:fs/promises');

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

(async function(){

fs.copyFile(path.join(__dirname, "template.html"), path.join(__dirname, "project-dist","index.html"), (err) =>{});
let template = await promis.readFile(path.join(__dirname, "project-dist", "index.html"));
const components = await promis.readdir(path.join(__dirname, "components"));
for(const component of components){
    const data = await promis.readFile(path.join(__dirname, "components", component));
    template = template.toString().replace(`{{${path.parse(path.join(__dirname, "components", component.split(".")[0])).name}}}`, data);
    await promis.writeFile(path.join(__dirname, "project-dist", "index.html"), template);
}
})();
