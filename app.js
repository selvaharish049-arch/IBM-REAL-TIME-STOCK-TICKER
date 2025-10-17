// app.js — Real-Time Stock Ticker (frontend-only sample)
// Example: Finnhub quote endpoint (REST polling):
// https://finnhub.io/api/v1/quote?symbol=IBM&token=YOUR_API_KEY
// Note: many providers have rate limits. Polling every 1-5 seconds may exceed free limits.


async function pollLiveQuote(symbol, apiKey){
// this example tries Finnhub format; if you prefer a different provider, change the URL.
const url = `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${encodeURIComponent(apiKey)}`;
try{
const res = await fetch(url);
if(!res.ok) throw new Error('Network response not ok');
const data = await res.json();
// Finnhub returns {c:current, d:change, h, l, o, pc:previousClose}
if(typeof data.c === 'number'){
const price = data.c;
const change = (data.d !== undefined) ? data.d : (price - (data.pc || price));
const ts = Date.now();
shiftTicker({symbol, price, change, ts});
updateSnapshot(symbol, price, change, ts);
} else {
console.warn('Unexpected API payload', data);
}
} catch(err){
console.error('Error polling live quote:', err.message);
}
}


function startLivePoller(symbol, apiKey, ms=3000){
// immediate poll then interval
pollerId = setInterval(()=> pollLiveQuote(symbol, apiKey), ms);
pollLiveQuote(symbol, apiKey);
}


function stopLivePoller(){
if(pollerId){ clearInterval(pollerId); pollerId = null; }
}


// --- Controls ---
startBtn.addEventListener('click', ()=>{
if(running) return;
running = true;
startBtn.disabled = true;
stopBtn.disabled = false;
const symbol = (symbolInput.value || 'IBM').toUpperCase().trim();
const apiKey = apiKeyInput.value.trim();


// clear previous
tickerEl.innerHTML = '';
snapshotBody.innerHTML = '';


if(useApi.checked && apiKey){
// Use live provider (polling REST endpoint)
startLivePoller(symbol, apiKey, 3000);
} else {
// Use simulated feed
startSimulatedFeed(symbol);
}
});


stopBtn.addEventListener('click', ()=>{
if(!running) return;
running = false;
startBtn.disabled = false;
stopBtn.disabled = true;
stopSimulatedFeed();
stopLivePoller();
});


// start automatically with default symbol
window.addEventListener('DOMContentLoaded', ()=>{
// optional: auto-start to show animation
// startBtn.click();
});