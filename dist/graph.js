// graph.js - Fetches transaction data from The Graph
const GRAPH_API_URL = 'https://api.thegraph.com/subgraphs/name/<your-subgraph>';

export async function fetchGraphData(userAddress) {
    const query = `
    {
      transactions(first: 5, where: { from: "${userAddress}" }) {
        id
        from
        to
        value
        blockNumber
      }
    }`;

    const response = await fetch(GRAPH_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
    });

    const { data } = await response.json();
    return data.transactions;
}
