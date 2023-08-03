function converSecToDuration(totalSec) {
    const hours = Math.floor(totalSec / 3600);
    const min = Math.floor((totalSec % 3600) / 60);
    const sec = Math.floor((totalSec % 3600) % 60);

    if(hours > 0) {
        return `${hours}h ${min}m`
    } 
    else if(min > 0) {
        return `${min}m ${sec}s`
    }
    else {
        return `${sec}s`
    }
}

module.exports = {converSecToDuration}