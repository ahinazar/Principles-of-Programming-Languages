import * as R from 'ramda'
/*
 * From Mozilla Developer Network:
 * The Promise.race(promises) method returns a promise that resolves or rejects
 * as soon as one of the promises in the array resolves or rejects,
 * with the value or reason from that promise.
 */
function race(promises) {
    return new Promise((resolve, reject) => {
        promises.forEach(promise => promise.then(resolve).catch(reject));
      });
}

/*
 * Write a function that takes an arbitrarily
 * nested array and generates the sequence
 * of values from the array.
 * Example: [...flatten([1, [2, [3]], 4, [[5, 6], 7, [[[8]]]]])] => [1, 2, 3, 4, 5, 6, 7, 8]
 */
const flatHelper = (array) => array.reduce((acc, curr) => acc.concat(curr instanceof Array ? flatHelper(curr) : curr), []);

function * flatten(array){
    for(const x in [...flatHelper(array)]) {
        yield  [...flatHelper(array)][x];
    }
}

/*
 * Given two generators, write a function
 * that generates the interleaved sequence
 * of elements of both generators.
 * Example: given generators for even and odd
 * numbers, take(interleave(evens(), odds()), 8) => [0, 1, 2, 3, 4, 5, 6, 7]
 */
function* interleave(g1, g2) {
    while(true) {
        yield g1.next().value;
        yield g2.next().value;
    }
}

/*
 * Write a function that continuously generates
 * elements of a given array in a cyclic manner.
 * Example: take(cycle([1, 2, 3]), 8) => [1, 2, 3, 1, 2, 3, 1, 2]
 */
function* cycle(array) {
    while(true){
        for(const i in array)
            yield array[i];
    }
}

/*
 * Write a function that returns
 * all elements from the first array,
 * then all elements from the next array, etc.
 * This function lets us to treat an array of arrays
 * as a single collection.
 * Example: [...chain([['A', 'B'], ['C', 'D']])] => ['A', 'B', 'C', 'D']
 */
function* chain(arrays) {
    for (const i in arrays)
        for (const j in arrays[i])
            yield arrays[i][j];
}

/*
 * In order to make testing your generators easier,
 * the function take takes a generator g and a natural number n
 * and returns an array of the first n elements of g.
 * If g is exhausted before reaching n elements,
 * less than n elements are returned. 
 */
function take(g, n) {
    const result = [];
    for (let i = 0; i < n; i++) {
        const { value, done } = g.next();
        console.log(value);
        if (done) {
            break;
        }
        result.push(value);
    }
    return result;
}
