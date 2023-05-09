const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, "secret-folder"), {withFileTypes: true}, (err, data) =>{
if(err){
    console.log(err);
}
data.forEach(file =>{
    if(file.isFile()){
        let name = file.name.split(".");
        fs.stat(path.join(__dirname, "secret-folder", file.name), (err,stats) =>{
            console.log(name[0] + '   ' + name[1] + '   ' + stats.size + 'B');
        } );
    }
});
});
