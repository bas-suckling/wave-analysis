const fs = require('fs')

function writeFile(path, content) {
    fs.writeFile(path, content, (err) => {
        if (err) throw err;
        //console.log(` ${path} file was succesfully saved`);
    }); 
}

module.exports = {
    writeFile
}