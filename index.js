<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MetaMask Auth with The Graph</title>
  <link rel="stylesheet" href="./css/styles.css">
  <script src="https://cdn.jsdelivr.net/npm/ethers/dist/ethers.min.js"></script>
  <script src="./js/metamask.js" defer></script>
  <script src="./js/graph.js" defer></script>
</head>
<body>
  <h1 id="statusText">Authenticate with MetaMask</h1>
  <p class="desc">Connect your MetaMask wallet to proceed.</p>
  <button class="onboard" id="connectButton">Connect MetaMask</button>
  <div class="loader" style="display:none;">Loading...</div>
  <div class="up" style="display:none;">&#9650;</div>
  <div class="confetti" style="display:none;">🎉</div>
  <audio class="success-anim" src="success-sound.mp3" preload="auto"></audio>

  <h2>Transaction History (from The Graph)</h2>
  <ul id="transactionList"></ul>
  <p id="walletAddress"></p>
</body>
</html>
