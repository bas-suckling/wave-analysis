function convertSeconds(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? (h < 10 ? "0" : "") + h + ":" : "00:";
    var mDisplay = m > 0 ? (m < 10 ? "0" : "") + m + ":": "00:";
    var sDisplay = s > 0 ? (s < 10 ? "0" : "") + s : "00";
    return hDisplay + mDisplay + sDisplay; 
}

module.exports = {
    convertSeconds
}