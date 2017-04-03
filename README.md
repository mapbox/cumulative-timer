## cumulative-timer

A simple cumulative timer for benchmarking.
Similar to `console.time` & `console.timeEnd`,
but accumulates time for a particular id over many calls.

### Example

```js
var timer = require('cumulative-timer');

timer.start('total');

timer.start('foo');
...
timer.end('foo');

timer.start('bar');
...
timer.end('bar');

timer.start('foo');
...
timer.end('foo');

timer.end('total');

timer.log();
```

Produces the following output:

```
 700ms 100.00% total
 204ms  29.14% foo
 496ms  70.86% bar
```

Note that the `total` timer id has a special treatment —
it's used for the percentage calculation on the log.
If there's no such id, the output will be just milliseconds.

For raw JSON of accumulated times, access `timer.times`.

The timer is global — you can require it from different files,
and the acummulated time stats will be shared.

Should also work in browsers with [Browserify](http://browserify.org/).
