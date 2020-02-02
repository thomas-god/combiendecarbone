fs = require('fs');

var lock = false;
var queue = [];
const file = 'log.log';

/**
 * Write log msg to log file.
 * 
 * @param {stringPath} file path to the log file
 * @param {string} logMsg message to log
 */
function writeLog(file, logMsg) {
    return new Promise((resolve, reject) => {
        fs.appendFile(file, logMsg, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(queue.pop());
            }
        });
    })
}
/**
 * Go over the queue of log msg to write.
 */
async function goOverQueue() {
    if (lock == false) {
        lock = !lock;
        while (queue.length > 0 && lock == true) {
            let val = await writeLog(file, queue[0]);
        }
        lock = !lock;
    }
}
/**
 * Write a log message to the log file.
 * 
 * @param {string} logMsg Log message to write
 */
function log(logMsg) {
    queue.push(logMsg);
    if(queue.length == 1) {
        goOverQueue()
    }
}

exports.log = log;