import { ethers } from 'ethers';

const connectButton = document.getElementById('connectButton');
const walletAddress = document.getElementById('walletAddress');

let provider: ethers.providers.Web3Provider;
let signer: ethers.providers.JsonRpcSigner;

export async function connectMetaMask(): Promise<void> {
  if (!window.ethereum) {
    alert('MetaMask not installed!');
    return;
  }

  provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send('eth_requestAccounts', []);
  signer = provider.getSigner();

  const address = await signer.getAddress();
  walletAddress!.textContent = address;

  // Start fetching transaction data
  await fetchTransactionData(address);
}

connectButton!.addEventListener('click', connectMetaMask);
