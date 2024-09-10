const GRAPH_API_URL = 'https://api.thegraph.com/subgraphs/name/blocklytics/ethereum-blocks';

export async function fetchTransactionData(walletAddress: string): Promise<void> {
  const query = `
    {
      transactions(first: 5, where: { from: "${walletAddress}" }) {
        id
        from
        to
        value
        blockNumber
      }
    }
  `;

  const response = await fetch(GRAPH_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  const result = await response.json();
  displayTransactions(result.data.transactions);
}

function displayTransactions(transactions: any[]): void {
  const transactionsList = document.getElementById('transactionsList');
  transactionsList!.innerHTML = '';

  transactions.forEach((tx) => {
    const li = document.createElement('li');
    li.textContent = `Tx: ${tx.id}, From: ${tx.from}, To: ${tx.to}, Value: ${tx.value}`;
    transactionsList!.appendChild(li);
  });
}
