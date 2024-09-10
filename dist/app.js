// app.js - Central logic to connect metamask and handle user interface.
import { connectMetaMask } from './metamask.js';
import { fetchGraphData } from './graph.js';

window.onload = function() {
    const connectButton = document.getElementById('connectButton');
    const transactionDisplay = document.getElementById('transactionDisplay');

    connectButton.addEventListener('click', async () => {
        const userAddress = await connectMetaMask();
        if (userAddress) {
            document.getElementById('userAddress').innerText = userAddress;
            const transactions = await fetchGraphData(userAddress);
            transactionDisplay.innerHTML = formatTransactions(transactions);
        }
    });
}

function formatTransactions(transactions) {
    return transactions.map(tx => `
        <div class="transaction">
            <p>From: ${tx.from}</p>
            <p>To: ${tx.to}</p>
            <p>Value: ${tx.value}</p>
            <p>Block: ${tx.blockNumber}</p>
        </div>
    `).join('');
}
