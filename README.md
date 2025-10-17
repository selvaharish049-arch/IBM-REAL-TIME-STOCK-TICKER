# IBM-REAL-TIME-STOCK-TICKER
Small front-end sample that demonstrates a real-time stock ticker UI. The project ships with: `index.html`, `style.css`, and `app.js` (all separate files).

git:https://github.com/selvaharish049-arch/IBM-REAL-TIME-STOCK-TICKER.git
live deplayment:https://selvaharish049-arch.github.io/IBM-REAL-TIME-STOCK-TICKER/
## Features
- Clean, responsive UI with rolling ticker animation.
- Local simulated feed (random-walk) so the demo runs offline.
- Optional: polling a live provider (example code uses Finnhub's REST quote endpoint). You must supply your own API key.


## Files
- `index.html` — markup and controls.
- `style.css` — styling and animation.
- `app.js` — core logic: simulated feed + optional live polling.


## How to run
1. Save the three files into a single folder: `index.html`, `style.css`, `app.js`.
2. Open `index.html` in any modern browser. No build step required.


## Using real market data (optional)
This project uses simulated updates by default. To use a live provider:


1. Sign up with a provider (example: [Finnhub](https://finnhub.io) or Alpha Vantag
