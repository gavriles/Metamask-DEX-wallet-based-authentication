// metamask.js - Handles MetaMask wallet connection
import { ethers } from 'ethers';

export async function connectMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const userAddress = await signer.getAddress();
            return userAddress;
        } catch (error) {
            console.error('Error connecting to MetaMask', error);
            return null;
        }
    } else {
        alert('MetaMask is not installed!');
        return null;
    }
}
