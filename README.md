# Repeat
A better way to do intervals.

## Pros
1. Repeat won't wait to the end of the first interval to run the callback. It will run it immediately.
2. You can access all the internals from inside the callback, so you can stop, change the duration or even the callback on the fly.

## Install
```$ npm install @danisl99/repeat```

## Example
```javascript
const Repeat = require('@danisl99/repeat');

// Without options the it will run forever with an interval of one second
// You can stop the interval externally or internally
const exampleOne = new Repeat((self) => {
    console.log(Date.now());
    // self.stop();
})

setTimeout(() => {
    exampleOne.stop();
}, 3000);

// With options
let counterOne = 0;
const exampleTwo = new Repeat({
    duration: 10000, // or use date:(Date.now()+5000)
    interval:500,
},(self) => {
    self.endTime -= 1000; // You can change the duration internally while it runs
    if(counterOne == 2){
        // Change callback on the fly
        self.callback = ()=>{
            console.log(Date.now());
        }
    }
    console.log(counterOne);
    counterOne++;
})

```