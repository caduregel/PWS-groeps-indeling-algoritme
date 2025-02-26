
const splitLargestSCC = (scc) => {
    const shuffled = [...scc].sort(() => Math.random() - 0.5); // Random shuffle
    const mid = Math.floor(scc.length / 2);
    return [shuffled.slice(0, mid), shuffled.slice(mid)];
}

const assignSmallSCCs = (sccs, groupA, groupB, adjacencyList) => {
    for (const scc of sccs) {
        let connectionsToA = 0, connectionsToB = 0;

        for (const node of scc) {
            const neighbors = adjacencyList.get(node) || [];
            connectionsToA += neighbors.filter(n => groupA.has(n)).length;
            connectionsToB += neighbors.filter(n => groupB.has(n)).length;
        }

        // Assign SCC to the group with more connections
        if (connectionsToA > connectionsToB) {
            groupA.add(...scc);
        } else {
            groupB.add(...scc);
        }
    }
}

function findSCCsKosaraju(nodes) {
    // Step 1: Build adjacency list
    const graph = new Map();
    const reversedGraph = new Map();

    nodes.forEach(node => {
        graph.set(node.id, node.friends);
        reversedGraph.set(node.id, []);
    });

    nodes.forEach(node => {
        node.friends.forEach(friend => {
            if (reversedGraph.has(friend)) {
                reversedGraph.get(friend).push(node.id); // Reverse edge
            }
        });
    });

    // Step 2: First DFS (to fill stack)
    const visited = new Set();
    const stack = [];
    console.log(nodes)
    function dfs(node) {
        if (visited.has(node)) return;
        visited.add(node);
        (graph.get(node) || []).forEach(neighbor => dfs(neighbor));
        stack.push(node);
    }

    nodes.forEach(node => {
        if (!visited.has(node.id)) dfs(node.id);
    });

    console.log(stack)
    // Step 3: Second DFS on reversed graph
    const sccs = [];
    visited.clear();

    function dfsReversed(node, component) {
        if (visited.has(node)) return;
        visited.add(node);
        component.push(node);
        (reversedGraph.get(node) || []).forEach(neighbor => dfsReversed(neighbor, component));
    }

    while (stack.length) {
        const node = stack.pop();
        if (!visited.has(node)) {
            const component = [];
            dfsReversed(node, component);
            sccs.push(component);
        }
    }

    return sccs;
}

const sortStudentsV2 = (students) => {
    const subGraphs = findSCCsKosaraju(students)
    const sortedSubGraphs = subGraphs.sort((a, b) => b.length - a.length);

    const [largestSCC, ...smallSCCs] = sortedSubGraphs;
    const [groupA, groupB] = splitLargestSCC(largestSCC);

    const setA = new Set(groupA);
    const setB = new Set(groupB);

    // create adjecancy list
    const adjacencyList = new Map();

    students.forEach(node => {
        adjacencyList.set(node.id, node.friends);
    });

    assignSmallSCCs(smallSCCs, setA, setB, adjacencyList);
    // console.log(sortedSubGraphs)
    // format sets to arrays
    const group1 = Array.from(setA);
    const group2 = Array.from(setB);
    return [group1, group2];
}

module.exports = sortStudentsV2