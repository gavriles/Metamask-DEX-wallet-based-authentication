let provider;

document.getElementById('connectButton').addEventListener('click', async () => {
  if (window.ethereum) {
    try {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      document.getElementById('walletAddress').innerText = `Connected: ${address}`;

      // Fetch transaction data from The Graph
      fetchGraphData(address);
    } catch (error) {
      console.error("Error connecting:", error);
    }
  } else {
    alert('MetaMask is not installed!');
  }
});
