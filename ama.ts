import *  as _ from "lodash";

type Node = number;

const V: Node[] = [1, 2, 3, 4, 5, 6, 7, 8];
const E = [
    [1, 2, 4],
    [1, 3, 9],
    [1, 4, 1],
    [1, 6, 7],
    [2, 3, 12],
    [2, 4, 4],
    [3, 8, 13],
    [4, 5, 7],
    [4, 6, 8],
    [5, 6, 3],
    [5, 7, 6],
    [5, 8, 5],
    [7, 8, 2],
];

const set = {};
const ama = [];
V.forEach((v) => set[v] = v);

function find(x: Node): Node {
    if (set[x] === x) {
        return x;
    }

    const parentSet = find(set[x]);
    set[x] = parentSet;
    return parentSet;
}

function union(x: Node, y: Node): boolean {
    const parentX = find(x);
    const parentY = find(y);

    if (parentX !== parentY) {
        set[parentY] = parentX;

        return true;
    }

    return false;
}

const sortedE = _.sortBy(E, ([, , d]) => d);

for (const e of sortedE) {
    const [x, y, ] = e;
    if (union(x, y)) {
        ama.push(e);
        if (ama.length === V.length - 1) {
            break;
        }
    }
}

console.log(ama);
