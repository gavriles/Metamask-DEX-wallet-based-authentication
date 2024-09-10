document.addEventListener('DOMContentLoaded', () => {
  const connectButton = document.getElementById('connectButton');

  connectButton.addEventListener('click', async () => {
    if (window.ethereum) {
      try {
        // Create a Web3 provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        
        // Request accounts from MetaMask
        await provider.send("eth_requestAccounts", []);
        
        // Get the signer
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        document.getElementById('walletAddress').innerText = `Connected: ${address}`;
        
        // Fetch transaction data from The Graph
        fetchGraphData(address);
      } catch (error) {
        console.error("Error connecting:", error);
        alert('Failed to connect to MetaMask');
      }
    } else {
      alert('MetaMask is not installed!');
    }
  });
});
