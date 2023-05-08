const fs = require('fs');
const path = require('path');
const process = require('process');
const { stdin, stdout } = process;

const FileWrite = fs.WriteStream(path.join(__dirname,"text.txt"), "utf-8");

stdout.write("Enter some text to write it to file.\n Enter 'exit' or press 'Ctrl + C' to exit.\n");
stdin.on("data", data => {
    if(data.toString() === 'exit' || data.toString() === 'exit\n' || data.toString() === 'exit\r\n'){
        process.exit();
    }
    else{
        FileWrite.write(data);
    }
})

process.on("SIGINT", () => process.exit());
process.on("exit", () =>{
    console.log("Goodbye");
});
