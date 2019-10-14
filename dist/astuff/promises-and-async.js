"use strict";
function finished(value) {
    console.log("Finished", value);
    return "Finished handled: " + value;
}
function handleError(value) {
    console.log('"Error"', value);
    return '"Error" handled: ' + value;
}
// Do Something Eventually takes a value of any type, an onFinished callback, and an onError callback
// After a random amount of time, onFinished or onError will be called, with 'value' being passed to the callback
// Using Timeout to simulate an asynchronous call (such as an HTTP or filesystem call)
function doSomethingEventually(value, onFinished, onError) {
    // Randomly wait between 500 and 2000ms to invoke the callback function
    const wait = 500 + Math.round(Math.random() * (2000 - 500));
    console.log("Start", "doSomethingEventually", value, "waiting", wait, "ms");
    setTimeout(() => {
        // Randomly determine if this will call finished or error
        const isError = Math.round(Math.random() * 5) === 0;
        if (!isError && onFinished) {
            onFinished(value);
        }
        else if (isError && onError) {
            onError(value);
        }
    }, wait);
}
function doSomethingWithAPromise(value) {
    return new Promise((resolve, reject) => {
        doSomethingEventually(value, resolve, reject);
    });
}
async function doSomethingUsingAsync(value) {
    try {
        const result = await doSomethingWithAPromise(value);
        return finished(result);
    }
    catch (error) {
        return handleError(error);
    }
}
async function doMultipleThingsAtTheSameTime(values) {
    const results = await Promise.all(values.map((val) => doSomethingUsingAsync(val)));
    return results;
}
async function doMultipleThingsOneAtATime(values) {
    const results = [];
    for (const val of values) {
        results.push(await doSomethingUsingAsync(val));
    }
    return results;
}
async function doAllTheThings() {
    let output = "";
    console.log();
    console.log("Start");
    console.log();
    await asyncWaitForKeyPress();
    // Run Do Something Eventually using callbacks
    output = doSomethingEventually('Run "Callback"', finished, handleError);
    console.log('Run "Callback"', "Returns:", output);
    await asyncWaitForKeyPress();
    // Run Do Something Eventually using a Promise
    // Since this is a Promise, you could use await, but this is showing how you would normally handle a promise
    output = doSomethingWithAPromise('Run "Promise"')
        .then(finished)
        .catch(handleError);
    console.log('Run "Promise"', "Returns:", output);
    await asyncWaitForKeyPress();
    // Run Do Something Eventually using Async (which is a Promise but appears to execute synchronously)
    output = await doSomethingUsingAsync('Run "Async"');
    console.log('Run "Async"', "Returns:", output);
    await asyncWaitForKeyPress();
    // Run Do Something Eventually for each item in the array without waiting for each to finish before starting the next
    output = await doMultipleThingsAtTheSameTime(['Run "Parallel" 1', 'Run "Parallel" 2', 'Run "Parallel" 3', 'Run "Parallel" 4']);
    console.log('Run "Parallel"', "Returns:", output);
    await asyncWaitForKeyPress();
    // Run Do Something Eventually for each item in the array but don't start the next until each has finished
    output = await doMultipleThingsOneAtATime(['Run "Serial" 1', 'Run "Serial" 2', 'Run "Serial" 3', 'Run "Serial" 4']);
    console.log('Run "Serial"', "Returns:", output);
    console.log();
    console.log("Done");
    console.log();
    process.exit(0);
}
function asyncWaitForKeyPress() {
    return new Promise((resolve) => {
        console.log("(Press any key to do start next test)");
        process.stdin.resume();
        process.stdin.on("data", resolve);
    });
}
doAllTheThings();
//# sourceMappingURL=promises-and-async.js.map