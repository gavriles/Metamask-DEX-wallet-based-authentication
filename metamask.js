document.addEventListener('DOMContentLoaded', () => {
  const connectButton = document.getElementById('connectButton');
  const statusText = document.getElementById('statusText');
  const statusDesc = document.querySelector('.desc');
  const loader = document.querySelector('.loader');
  const upArrow = document.querySelector('.up');
  const confetti = document.querySelector('.confetti');
  const player = document.querySelector('.success-anim');

  const isMetaMaskInstalled = () => {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  const MetaMaskClientCheck = async () => {
    if (!isMetaMaskInstalled()) {
      statusText.innerText = "You need to install a wallet";
      statusDesc.innerText = "We recommend MetaMask.";
      connectButton.innerText = "Install MetaMask";
      connectButton.href = "https://metamask.io/";
      connectButton.target = "_blank"; // Open in new tab
    } else {
      try {
        const signResult = await connectAndSign();
        if (signResult) {
          showAddress(signResult);
        } else {
          statusText.innerHTML = "Connect your wallet";
          statusDesc.innerHTML = `Please connect your MetaMask wallet.`;
          connectButton.innerText = "Connect MetaMask";
          upArrow.style.display = "block";
        }
      } catch (error) {
        console.error("Connection failed:", error);
        statusText.innerHTML = "Connection Failed";
        statusDesc.innerHTML = "An error occurred while connecting to MetaMask.";
      }
    }
  };

  const connectAndSign = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      return address;
    } catch (err) {
      console.warn("Failed to connect and sign message.", err);
      throw err; // Re-throw the error to handle it in MetaMaskClientCheck
    }
  };

  const showAddress = (address) => {
    statusText.innerHTML = "Connected!";
    statusDesc.classList.add("account");
    statusDesc.innerHTML = address;
    connectButton.style.display = "none";
    loader.style.display = "none";
    upArrow.style.display = "none";
    confetti.style.display = "block";
    player.play();
  };

  connectButton.addEventListener('click', async () => {
    connectButton.style.backgroundColor = "#cccccc";
    loader.style.display = "block";
    MetaMaskClientCheck();
  });

  // Initialize the MetaMask check on page load
  MetaMaskClientCheck();
});
