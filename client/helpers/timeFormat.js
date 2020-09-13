function convertSeconds(d) {
    d = Number(d);
    let h = Math.floor(d / 3600);
    let m = Math.floor(d % 3600 / 60);
    let s = Math.floor(d % 3600 % 60);

    let hDisplay = h > 0 ? + h + ":" : "00:";
    let mDisplay = m > 0 ? (m < 10 ? "0" : "") + m + ":": "00:";
    let sDisplay = s > 0 ? (s < 10 ? "0" : "") + s : "00";
    return hDisplay + mDisplay + sDisplay; 
}

module.exports = {
    convertSeconds
}