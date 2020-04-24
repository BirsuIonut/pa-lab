import *  as _ from "lodash";

const V = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const E = [
    [1, 2],
    [1, 7],
    [1, 8],
    [2, 3],
    [2, 6],
    [3, 4],
    [3, 5],
    [8, 9],
    [8, 12],
    [9, 10],
    [9, 11],
];

const parents = {}
const discoverTime = {}
const finalTime = {}
const colors = {}
const neighbors = {}

let time = 0;

V.forEach((v) => parents[v] = -1);
V.forEach((v) => colors[v] = 'alb');
V.forEach((v) => neighbors[v] = []);

E.forEach(([v1, v2]) => {
    neighbors[v1].push(v2);
    neighbors[v2].push(v1);
});

V.forEach((v) => colors[v] === 'alb' ? explore(v) : undefined)

function explore(v) {
    discoverTime[v] = time++;
    colors[v] = 'gri';
    neighbors[v].forEach((n) => {
        if (colors[n] === 'alb') {
            parents[n] = v
            explore(n);
        }
    })

    colors[v] = 'negru';
    finalTime[v] = time++
}


console.log(parents)
console.log(discoverTime)
console.log(finalTime)