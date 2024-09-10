async function fetchGraphData(walletAddress) {
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
  
  const response = await fetch('https://api.thegraph.com/subgraphs/name/your-subgraph', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });

  const result = await response.json();
  displayTransactions(result.data.transactions);
}

function displayTransactions(transactions) {
  const transactionList = document.getElementById('transactionList');
  transactionList.innerHTML = '';  // Clear the list before appending

  transactions.forEach(tx => {
    const listItem = document.createElement('li');
    listItem.innerText = `Tx ID: ${tx.id}, From: ${tx.from}, To: ${tx.to}, Value: ${ethers.utils.formatEther(tx.value)} ETH`;
    transactionList.appendChild(listItem);
  });
}
