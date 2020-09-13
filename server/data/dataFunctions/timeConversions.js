const moment = require('moment');


// sanitize raw time input
function parseTime(gpxTimeStamp) {
    return gpxTimeStamp.replace(/\T/g,' ').replace(/\Z/g,'');
}


//converts timestamp to unix time (2020-07-07 03:42:40 to 1594093360 )
function convertUnixTime(gpxTimeStamp) {
    return moment(gpxTimeStamp).unix()*1000
}


// //converts seconds to HH : MM : SS format
// function convertHMS(sec) {
//     let hours   = Math.floor(sec / 3600); 
//     let minutes = Math.floor((sec - (hours * 3600)) / 60); 
//     let seconds = sec - (hours * 3600) - (minutes * 60); 
    
//     if (hours   < 10) {hours   = "0"+hours;}
//     if (minutes < 10) {minutes = "0"+minutes;}
//     if (seconds < 10) {seconds = "0"+seconds;}
//     return hours+':'+minutes+':'+seconds; 
// }

function timeRead(unix){
    return new Date(unix).toUTCString().slice(-12, -4)
} 
    


module.exports = {
    convertUnixTime,
    parseTime,
    timeRead
}