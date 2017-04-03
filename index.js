'use strict';

exports.start = start;
exports.stop = stop;
exports.log = log;

var times = exports.times = {};
var started = exports.started = {};

var now = typeof performance !== 'undefined' && performance.now
    ? function () { return performance.now(); }
    : function () { var hr = process.hrtime(); return hr[0] * 1e3 + hr[1] / 1e6; };

function start(id) {
    if (started[id]) {
        throw new Error(`Duplicate timer start: ${id}`);
    }
    started[id] = now();
    times[id] = times[id] || 0;
}

function stop(id) {
    if (!started[id]) {
        throw new Error(`Stopping timer that has not started: ${id}`);
    }
    times[id] += now() - started[id];
    started[id] = null;
}

function log() {
    var total = times.total;
    for (var id in times) {
        var t = leftpad(Math.round(times[id]), 6);
        var p = total ? `${leftpad((1e2 * times[id] / total).toFixed(2), 6)}% ` : '';
        console.log(`${t}ms ${p}%${id}`);
    }
}

function leftpad(str, num) {
    str += '';
    while (str.length < num) str = ' ' + str;
    return str;
}
