import *  as _ from "lodash";

type Node = number;

const V: Node[] = [1, 2, 3, 4, 5, 6, 7, 8];
const E = [
    [1, 2],
    [1, 3],
    [2, 4],
    [3, 4],
    [4, 5],
    [4, 7],
    [6, 7],
    [6, 8],
    [7, 8],
];

const parent = {};
const discoverTime = {};
const low = {};
const neighbors = {};
const children = {};
const visited = {};

let time = 0;

V.forEach((v) => parent[v] = -1);
V.forEach((v) => neighbors[v] = []);
V.forEach((v) => children[v] = []);
V.forEach((v) => visited[v] = false);

E.forEach(([v1, v2]) => {
    neighbors[v1].push(v2);
    neighbors[v2].push(v1);
});


V.forEach((v) => !visited[v] ? dfsAP(v) : undefined)
console.log(parent);

function dfsAP(v: Node): void {
    visited[v] = true;
    discoverTime[v] = low[v] = time++;
    neighbors[v].forEach((n: Node) => {
        if(parent[v] !== n) {
            if(!visited[n]) {
                parent[n] = v;
                children[v].push(n);
                dfsAP(n);
                low[v] = _.min([low[v], low[n]]);
            } else {
                low[v] = _.min([low[v], discoverTime[n]]);
            }
        }
    });

    if(parent[v] === -1) {
        if(children[v].length >= 2) {
            console.log(`${v} este PA`);
        }
    } else {
        let isAP = false;
        children[v].forEach((c: Node) => {
            if(low[c] >= discoverTime[v]) {
                isAP = true;
            }
        })

        if(isAP) {
            console.log(`${v} este PA`);
        }
    }
}