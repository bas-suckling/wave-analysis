const xml2js = require('xml2js');
const fs = require('fs');
const parseTrack = require('./parseTrack');

function createTrackPoints(filename) {
    return new Promise((res, rej) => {
        fs.readFile(filename,'utf8', (err, data) => {
            if(err) {
                rej(err);
                return;
            }

            let parser = new xml2js.Parser();
            parser.parseString(data, (err, xml) => {
                if(err) {
                    rej(err);
                } else {
                    res(parseTrack(xml.gpx.trk));
                }
            })
        })
    })
}

function createJSONFile(path, content) {
    fs.writeFile(path, content, (err) => {
        if (err) throw err;
        console.log("The file was succesfully saved");
    }); 
}

module.exports = {
    createJSONFile,
    createTrackPoints
}

    

