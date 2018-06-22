
//------------------------------------------------------ Q 2 -------------------------------------------------------------

//------------------------------------------------------ Q 2.1 -----------------------------------------------------------

interface BinTree {
    root: number;
    left?: BinTree;
    right?: BinTree;
};

//------------------------------------------------------ Q 2.1.1 ---------------------------------------------------------
declare var require: any
const assert = require('assert');

const TreePreArray: (binTree: BinTree) => number[] = (binTree) => {
    if (binTree === undefined) {
        return [];
    } else {
        return [binTree.root].concat(TreePreArray(binTree.left)).concat(TreePreArray(binTree.right));
    }
}

//3 TESTS
assert.deepEqual(TreePreArray({
    root: 1,
    left: { root: 2 },
    right: {
        root: 3,
        left: { root: 4 }
    }
}
), [1, 2, 3, 4]);

assert.deepEqual(TreePreArray({
    root: 1,
    left: {
        root: 2,
        left: { root: 3 },
        right: {
            root: 4,
            left: { root: 5 }
        }
    }
}
), [1, 2, 3, 4, 5]);

assert.deepEqual(TreePreArray({
    root: 1,
    left: {
        root: 2,
        left: { root: 3 },
        right: { root: 4 }
    },
    right: {
        root: 5,
        left: { root: 6 },
        right: { root: 7 }
    }
}), [1, 2, 3, 4, 5, 6, 7]);

//------------------------------------------------------Q 2.1.2 ---------------------------------------------------------

declare var require: any
const assert = require('assert');


const TreeInArray: (binTree: BinTree) => number[] = (binTree) => {
    if (binTree === undefined) {
        return [];
    } else {
        return TreeInArray(binTree.left).concat([binTree.root]).concat(TreeInArray(binTree.right));
    }
}

//3 TESTS
assert.deepEqual(TreeInArray({
    root: 2,
    left: { root: 1 },
    right: {
        root: 4,
        left: { root: 3 }
    }
}
), [1, 2, 3, 4]);

assert.deepEqual(TreeInArray({
    root: 5,
    left: {
        root: 2,
        left: { root: 1 },
        right: {
            root: 4,
            left: { root: 3 }
        }
    }
}
), [1, 2, 3, 4, 5]);

assert.deepEqual(TreeInArray({
    root: 4,
    left: {
        root: 2,
        left: { root: 1 },
        right: { root: 3 }
    },
    right: {
        root: 6,
        left: { root: 5 },
        right: { root: 7 }
    }
}), [1, 2, 3, 4, 5, 6, 7]);

//------------------------------------------------------Q 2.1.3 ---------------------------------------------------------

declare var require: any
const assert = require('assert');

const TreePostArray: (binTree: BinTree) => number[] = (binTree) => {
    if (binTree === undefined) {
        return [];
    } else {
        return TreePostArray(binTree.left).concat(TreePostArray(binTree.right)).concat([binTree.root]);
    }
}

//3 TESTS
assert.deepEqual(TreePostArray({
    root: 4,
    left: { root: 1 },
    right: {
        root: 3,
        left: { root: 2 }
    }
}
), [1, 2, 3, 4]);

assert.deepEqual(TreePostArray({
    root: 5,
    left: {
        root: 4,
        left: { root: 1 },
        right: {
            root: 3,
            left: { root: 2 }
        }
    }
}
), [1, 2, 3, 4, 5]);

assert.deepEqual(TreePostArray({
    root: 7,
    left: {
        root: 3,
        left: { root: 1 },
        right: { root: 2 }
    },
    right: {
        root: 6,
        left: { root: 4 },
        right: { root: 5 }
    }
}), [1, 2, 3, 4, 5, 6, 7]);

//------------------------------------------------------Q 2.1.4 ---------------------------------------------------------

interface GBinTree<T> {
    root: T;
    left?: GBinTree<T>;
    right?: GBinTree<T>;
};

declare var require: any
const assert = require('assert');

const GBinTreePreArray: <T>(gBinTree: GBinTree<T>) => T[] = (gBinTree) => {
    if (gBinTree === undefined) {
        return [];
    } else {
        return [gBinTree.root].concat(GBinTreePreArray(gBinTree.left)).concat(GBinTreePreArray(gBinTree.right));
    }
}

//3 TESTS
assert.deepEqual(GBinTreePreArray({
    root: 1,
    left: { root: 2 },
    right: {
        root: 3,
        left: { root: 4 }
    }
}
), [1, 2, 3, 4]);

assert.deepEqual(GBinTreePreArray({
    root: "a",
    left: {
        root: "b",
        left: { root: "c" },
        right: {
            root: "d",
            left: { root: "e" }
        }
    }
}
), ["a", "b", "c", "d", "e"]);

assert.deepEqual(GBinTreePreArray({
    root: { a: 1 },
    left: {
        root: { a: 2 },
        left: { root: { a: 3 } },
        right: { root: { a: 4 } }
    },
    right: {
        root: { a: 5 },
        left: { root: { a: 6 } },
        right: { root: { a: 7 } }
    }
}), [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }, { a: 6 }, { a: 7 }]);

//------------------------------------------------------Q 2.1.5 ---------------------------------------------------------

declare var require: any
const assert = require('assert');

const GBinTreeInArray: <T>(gBinTree: GBinTree<T>) => T[] = (gBinTree) => {
    if (gBinTree === undefined) {
        return [];
    } else {
        return GBinTreeInArray(gBinTree.left).concat([gBinTree.root]).concat(GBinTreeInArray(gBinTree.right));
    }
}

//3 TESTS
assert.deepEqual(GBinTreeInArray({
    root: 2,
    left: { root: 1 },
    right: {
        root: 4,
        left: { root: 3 }
    }
}
), [1, 2, 3, 4]);

assert.deepEqual(GBinTreeInArray({
    root: "e",
    left: {
        root: "b",
        left: { root: "a" },
        right: {
            root: "d",
            left: { root: "c" }
        }
    }
}
), ["a", "b", "c", "d", "e"]);

assert.deepEqual(GBinTreeInArray({
    root: { a: 4 },
    left: {
        root: { a: 2 },
        left: { root: { a: 1 } },
        right: { root: { a: 3 } }
    },
    right: {
        root: { a: 6 },
        left: { root: { a: 5 } },
        right: { root: { a: 7 } }
    }
}), [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }, { a: 6 }, { a: 7 }]);

//------------------------------------------------------Q 2.1.6 ---------------------------------------------------------

declare var require: any
const assert = require('assert');

const GBinTreePostArray: <T>(gBinTree: GBinTree<T>) => T[] = (gBinTree) => {
    if (gBinTree === undefined) {
        return [];
    } else {
        return GBinTreePostArray(gBinTree.left).concat(GBinTreePostArray(gBinTree.right)).concat([gBinTree.root]);
    }
}

//3 TESTS
assert.deepEqual(GBinTreePostArray({
    root: 4,
    left: { root: 1 },
    right: {
        root: 3,
        left: { root: 2 }
    }
}
), [1, 2, 3, 4]);

assert.deepEqual(GBinTreePostArray({
    root: "e",
    left: {
        root: "d",
        left: { root: "a" },
        right: {
            root: "c",
            left: { root: "b" }
        }
    }
}
), ["a", "b", "c", "d", "e"]);

assert.deepEqual(GBinTreePostArray({
    root: { a: 7 },
    left: {
        root: { a: 3 },
        left: { root: { a: 1 } },
        right: { root: { a: 2 } }
    },
    right: {
        root: { a: 6 },
        left: { root: { a: 4 } },
        right: { root: { a: 5 } }
    }
}), [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }, { a: 6 }, { a: 7 }]);

//------------------------------------------------------Q 2.2 ---------------------------------------------------------

//------------------------------------------------------Q 2.2.1 -------------------------------------------------------

declare var require: any
const assert = require('assert');

const KSubset: <T> (A: T[], k: number) => T[] = (A, k) => {
    return KSubset_helper([], 0, k, A);
}

const KSubset_helper: <T> (Acc: T[], index: number, k: number, A: T[]) => T[] = (Acc, index, k, A) => {
    if (Acc.length === k) {
        return [Acc];
    }
    if (A.length === index) {
        return [];
    }
    return KSubset_helper(Acc.concat(A[index]), index + 1, k, A).concat(KSubset_helper(Acc, index + 1, k, A));
}

//3 TESTS
assert.deepEqual(KSubset([1, 2, 3], 2), [[1, 2], [1, 3], [2, 3]]);

assert.deepEqual(KSubset([1, 2, 3, 4], 3), [[1, 2, 3], [1, 2, 4], [1, 3, 4], [2, 3, 4]]);

assert.deepEqual(KSubset([1, 2, 3, 4], 2), [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]);

//------------------------------------------------------Q 2.2.2 -------------------------------------------------------

declare var require: any
const assert = require('assert');

const AllSubsets: <T> (A: T[]) => T[] = (A) => {
    return AllSubsets_helper(A, A.length);
}
const AllSubsets_helper: <T> (A: T[], k: number) => T[] = (A, k) => {
    if (k < 0)
        return [];
    return AllSubsets_helper(A, k - 1).concat(KSubset(A, k));
}

const KSubset: <T> (A: T[], k: number) => T[] = (A, k) => {
    return KSubset_helper([], 0, k, A);
}
const KSubset_helper: <T> (Acc: T[], index: number, k: number, A: T[]) => T[] = (Acc, index, k, A) => {
    if (Acc.length === k) {
        return [Acc];
    }
    if (A.length === index) {
        return [];
    }
    return KSubset_helper(Acc.concat(A[index]), index + 1, k, A).concat(KSubset_helper(Acc, index + 1, k, A));
}

//3 TESTS
assert.deepEqual(AllSubsets([1, 2, 3]), [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]);

assert.deepEqual(AllSubsets([]), [[]]);

assert.deepEqual(AllSubsets([1, 2, 3, 4]), [[], [1], [2], [3], [4], [1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4], [1, 2, 3], [1, 2, 4], [1, 3, 4], [2, 3, 4], [1, 2, 3, 4]]);

//------------------------------------------------------Q 2.3 -------------------------------------------------------

//------------------------------------------------------Q 2.3.1 -------------------------------------------------------

import { map } from "ramda"

declare var require: any
const assert = require('assert');

const flatMap: <T, R> (f: (x: T[]) => R[], A: T[]) => R[] = (f, A) => {
    return flatter(map(f, A), A.length - 1);
}

const flatter: <T> (A: T[], n: number) => T[] = (A, n) => {
    if (n < 0)
        return [];
    return flatter(A, n - 1).concat(A[n]);
}

//3 TESTS
assert.deepEqual(flatMap((x) => x[0], [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]), [1, 2, 5, 6]);

assert.deepEqual(flatMap((x) => x[0], [[[1, 2, [9]], [3, 4]], [[5, 6], [7, 8]]]), [1, 2, [9], 5, 6]);

assert.deepEqual(flatMap((x) => x[1], [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]), [3, 4, 7, 8]);

//------------------------------------------------------Q 2.3.1 -------------------------------------------------------

declare var require: any
const assert = require ('assert');
import {map} from "ramda"

const flatMap:<T> (f:(x:T[])=>any[],A:T[])=>any[]=(f,A)=>{
    return flatter(map(f,A), A.length-1);
}

const flatter:<T> (A:T[], n:number)=>T[]=(A,n)=>{
    if(n<0)
        return [];
    return flatter(A, n-1).concat(A[n]);
}

const getBoxArts :(movieLists:{name:string, videos:{id:number, title:string, boxarts:{width:number, height:number, url:string}[], url:string, rating:number, bookmark:{id:number, time:number}[]}[]}[]) => {id:number, title:string, boxarts:{width:number, height:number, url:string}[]}[] = (movieLists) => {
    return flatMap((x)=>x,movieLists.map((x)=>x.videos)).map((x)=>{return {id: x.id, title: x.title, boxarts: x.boxarts.filter((y)=>y.width==150 && y.height==200).map(p=>{ return {url:p.url}})}})
}

let movieLists = [
    {
        name: "Instant Queue",
        videos : [
            {
                "id": 70111470,
                "title": "Die Hard",
                "boxarts": [
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 4.0,
                "bookmark": []
            },
            {
                "id": 654356453,
                "title": "Bad Boys",
                "boxarts": [
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" }

                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "bookmark": [{ id: 432534, time: 65876586 }]
            }
        ]
    },
    {
        name: "New Releases",
        videos: [
            {
                "id": 65432445,
                "title": "The Chamber",
                "boxarts": [
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" },
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 4.0,
                "bookmark": []
            },
            {
                "id": 675465,
                "title": "Fracture",
                "boxarts": [
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
                    { width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "bookmark": [{ id: 432534, time: 65876586 }]
            }
        ]
    }
];

assert.deepStrictEqual(getBoxArts([{name: "Empty", videos: []}]), []);
assert.deepStrictEqual(getBoxArts([]), []);
assert.deepStrictEqual(getBoxArts(movieLists),[
    {
        "id": 70111470,
        "title": "Die Hard",
        "boxarts": [
            {
                "url": "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg"
            }
        ]
    },
    {
        "id": 654356453,
        "title": "Bad Boys",
        "boxarts": [
            {
                "url": "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg"
            }
        ]
    },
    {
        "id": 65432445,
        "title": "The Chamber",
        "boxarts": [
            {
                "url": "http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg"
            }
        ]
    },
    {
        "id": 675465,
        "title": "Fracture",
        "boxarts": [
            {
                "url": "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg"
            }
        ]
    }
]);
