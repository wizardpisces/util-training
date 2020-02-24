transform([1, 2, 3], function (acc, item, index, callback) {
    // pointless async:
    process.nextTick(function () {
        acc[index] = item * 2
        callback(null)
    });
}, function (err, result) {
    // result is now equal to [2, 4, 6]
    console.log(result)
});

transform({ a: 1, b: 2, c: 3 }, function (obj, val, key, callback) {
    setTimeout(function () {
        obj[key] = val * 2;
        callback();
    }, 1000)
}, function (err, result) {
    // result is equal to {a: 2, b: 4, c: 6}
    console.log(result)
})

function transform(object, transformFn, cb) {
    let obj = new object.constructor,
        keys = Object.keys(object),
        len = keys.length;

    function genTransformFn(val, key) {
        function callback(error) {

            // console.log(obj, val, key, len)
            len--;
            if (len === 0 && cb) {
                return cb(error, obj)
            }
        }

        return transformFn(obj, val, key, callback)
    }

    keys.forEach(key => {
        genTransformFn(object[key], key)
    })
}
