const BASE_URL = "https://api.coingecko.com/api/v3";

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins/markets?vs_currency=usd`).then((response) =>
    response.json()
  );
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchMarketChart(coinId: string) {
  return fetch(
    `${BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=14'`
  ).then((response) => response.json());
}

export function fetchOhlcv(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}/ohlc?vs_currency=usd&days=14
    `).then((response) => response.json());
}
//https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=14
