let file = './data/Surf_2020-07-07.gpx'

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

let trackPoints = createTrackPoints(file)
    .then(console.log(trackpoints))

// setTimeout(() => console.log(trackPoints), 1000)
