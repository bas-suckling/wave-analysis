const moment = require('moment');

//converts timestamp to unix time (2020-07-07 03:42:40 to 1594093360 )
function convertUnixTime(gpxTimeStamp) {
    let unixtTimeStamp = moment(gpxTimeStamp).unix()
    return unixtTimeStamp*1000 //miliseconds to seconds
}

//removes T and Z characters from gpxtimestamp(2020-07-07T03:42:40Z to 2020-07-07 03:42:40 )
function parseTime(gpxTimeStamp) {
    return gpxTimeStamp.replace(/\T/g,' ').replace(/\Z/g,'');
}

//converts seconds to HH : MM : SS format
function convertHMS(sec) {
    let hours   = Math.floor(sec / 3600); 
    let minutes = Math.floor((sec - (hours * 3600)) / 60); 
    let seconds = sec - (hours * 3600) - (minutes * 60); 
    
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds; 
}

module.exports = {
    convertUnixTime,
    parseTime,
    convertHMS
}