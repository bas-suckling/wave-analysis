const xml2js = require('xml2js');
const fs = require('fs');
const parseTrack = require('./parseTrack');

// reads .gpx file (xml) returns the track data as a string (json format)
function parseTrackPoints(filename) {
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

module.exports = {
    parseTrackPoints
}

    

