

parallel([
    function (callback) {
        setTimeout(function () {
            callback(null, 'one');
        }, 200);
    },
    function (callback) {
        setTimeout(function () {
            callback(null, 'two');
        }, 100);
    }
],
    // optional callback
    function (err, results) {
        // the results array will equal ['one','two'] even though
        // the second function had a shorter timeout.
    });

// an example using an object instead of an array
parallel({
    one: function (callback) {
        setTimeout(function () {
            callback(null, 1);
        }, 200);
    },
    two: function (callback) {
        setTimeout(function () {
            callback(null, 2);
        }, 100);
    }
}, function (err, results) {
    // results is now equals to: {one: 1, two: 2}
        console.log(results)

});

function parallel(object, cb) {
    let keys = Object.keys(object),
        len = keys.length;

    let results = new object.constructor;

    function getCb(key) {
        return (error, result) => {
            len--;
            results[key] = result;
            // console.log(len, result, results, key)
            if (len===0 && cb) {
                cb(error,results)
            }
        }
    }



    keys.forEach((key, index) => {
        object[key](getCb(key))
    })
}

// export default parallel