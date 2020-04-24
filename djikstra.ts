import *  as _ from "lodash";
import * as fhl from "fibonacci-heap";

type Node = number;
const Inf = 99999999999999;

const V: Node[] = [1, 2, 3, 4, 5];
const E = [
    [1, 2, 10],
    [1, 3, 50],
    [1, 4, 30],
    [2, 3, 20],
    [3, 5, 10],
    [4, 5, 20],
];
const source = 1;

const parent = {};
const distances = {};
const neighbors = {};
const selected = new Set();
const visited = new Set();

V.forEach((v) => neighbors[v] = []);
V.forEach((v) => distances[v] = Inf);
distances[source] = 0;

const fh = new fhl.FibonacciHeap();

E.forEach(([v1, v2, distance]) => {
    neighbors[v1].push([v2, distance]);
});

fh.insert({value: source, priority: 0});

while(fh.trees() > 0) {
    const current = fh.deleteMin();
    const node: Node = current.value;

    selected.add(node);

    neighbors[node].forEach(([n, d]: [Node, number]) => {
        if(!selected.has(n) && distances[n] > distances[node] + d) {
            distances[n] = distances[node] + d;
            parent[n] = node;

            if(visited.has(n)) {
                fh.update({value: n, priority: distances[n]});
            } else {
                fh.insert({value: n, priority: distances[n]});
            }
            visited.add(n);
        }
    })
}

console.log({parent, distances, selected});
