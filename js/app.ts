import { connectMetaMask } from './metamask';
import { fetchTransactionData } from './graph';

// Start the app
(async function () {
  await connectMetaMask();
})();
