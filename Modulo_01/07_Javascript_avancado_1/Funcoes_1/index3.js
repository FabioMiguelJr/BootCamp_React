//
function createCounter(initial) {
    var counter = initial;

    function increment(value) {
        if (!isFinite(value) || value < 1) {
            value = 1;
        }
        counter += value;
    }

    function get() {
        return counter;
    }

    return {
        increment: increment,
        get: get,
    };
}

var myCounter = createCounter(100);

console.log(myCounter.get()); // print "100"

myCounter.increment(5);
console.log(myCounter.get()); // print "105"
