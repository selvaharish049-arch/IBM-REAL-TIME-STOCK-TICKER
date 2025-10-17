// Elements references
const symbolInput = document.getElementById('symbolInput');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const tickerEl = document.getElementById('ticker');
const snapshotBody = document.getElementById('snapshotBody');

let running = false;
let feedInterval = null;

// Helper to format time nicely
function formatTime(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString();
}

// Push a new item to the ticker and keep max 20 items
function shiftTicker({symbol, price, change, ts}) {
  const item = document.createElement('div');
  item.className = 'item';

  const upDownClass = change >= 0 ? 'up' : 'down';
  const sign = change >= 0 ? '+' : '';

  item.innerHTML = `
    <span class="symbol">${symbol}</span>
    <span class="price">${price.toFixed(2)}</span>
    <span class="${upDownClass}">${sign}${change.toFixed(2)}</span>
  `;

  tickerEl.appendChild(item);

  // Remove old items to keep length manageable
  if(tickerEl.children.length > 20) {
    tickerEl.removeChild(tickerEl.firstChild);
  }
}

// Update the snapshot table with the latest quote
function updateSnapshot(symbol, price, change, ts) {
  snapshotBody.innerHTML = `
    <tr>
      <td>${symbol}</td>
      <td>${price.toFixed(2)}</td>
      <td class="${change >= 0 ? 'up' : 'down'}">${change >= 0 ? '+' : ''}${change.toFixed(2)}</td>
      <td>${formatTime(ts)}</td>
    </tr>
  `;
}

// Simulated feed: random walk price updates
function startSimulatedFeed(symbol) {
  let price = 100 + Math.random() * 20; // starting price around 100
  let prevPrice = price;

  feedInterval = setInterval(() => {
    // Random price change between -1 and +1
    const change = (Math.random() - 0.5) * 2;
    price = Math.max(1, price + change); // price can’t go below 1
    const actualChange = price - prevPrice;
    prevPrice = price;

    const ts = Date.now();

    shiftTicker({symbol, price, change: actualChange, ts});
    updateSnapshot(symbol, price, actualChange, ts);
  }, 1500); // update every 1.5 seconds
}

function stopSimulatedFeed() {
  if(feedInterval) {
    clearInterval(feedInterval);
    feedInterval = null;
  }
}

// Start button event
startBtn.addEventListener('click', () => {
  if (running) return;
  running = true;

  startBtn.disabled = true;
  stopBtn.disabled = false;

  const symbol = (symbolInput.value || 'IBM').toUpperCase().trim();

  // Clear previous data
  tickerEl.innerHTML = '';
  snapshotBody.innerHTML = '';

  // Start simulated feed
  startSimulatedFeed(symbol);
});

// Stop button event
stopBtn.addEventListener('click', () => {
  if (!running) return;
  running = false;

  startBtn.disabled = false;
  stopBtn.disabled = true;

  stopSimulatedFeed();
});

// Optional: auto-start with default symbol when page loads
window.addEventListener('DOMContentLoaded', () => {
  // Uncomment this line to start automatically on load
  // startBtn.click();
});
