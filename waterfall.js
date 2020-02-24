waterfall([
    function (callback) {
        callback(null, 'one', 'two');
    },
    function (arg1, arg2, callback) {
        // arg1 now equals 'one' and arg2 now equals 'two'
        callback(null, 'three');
    },
    function (arg1, callback) {
        // arg1 now equals 'three'
        callback(null, 'done');
    }
], function (err, result) {
    // result now equals 'done'
    // console.log(err, result)
});

// Or, with named functions:
waterfall([
    myFirstFunction,
    mySecondFunction,
    myLastFunction,
], function (err, result) {
    // result now equals 'done'
    console.log(err, result)

});
function myFirstFunction(callback) {
    callback(null, 'one', 'two');
}
function mySecondFunction(arg1, arg2, callback) {
    // arg1 now equals 'one' and arg2 now equals 'two'
    callback(null, 'three');
}
function myLastFunction(arg1, callback) {
    // arg1 now equals 'three'
    callback(null, 'done');
}


function waterfall(fns, cb) {

    function callback(err, ...args) {
        if (err || fns.length === 0) {
            console.log('bump into error or finished callback')
            return cb.apply(null, [err].concat(args))
        }
        let fn = fns.shift();
        fn.apply(null, args.concat(callback))
    }

    callback.apply(null,[])
}