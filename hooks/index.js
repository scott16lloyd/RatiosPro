import { useQuery } from '@tanstack/react-query';

const fetchBiggestGainers = async () => {
  // Provides a list of the stocks that have gained the most value on a given day
  const response = await fetch(
    `https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const data = await response.json();
  return data;
};

const fetchMostPopular = async () => {
  // Provides a list of the stocks that have the highest trading volume on a given day
  const response = await fetch(
    `https://financialmodelingprep.com/api/v3/stock_market/actives?apikey=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const data = await response.json();
  return data;
};

const fetchMostPopularBySector = async () => {
  // Fetch all stocks
  const response = await fetch(
    `https://financialmodelingprep.com/api/v3/stock-screener?apikey=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const stocks = await response.json();

  // Group stocks by sector and sort by volume
  const sectors = {};
  for (const stock of stocks) {
    if (!stock.sector) continue;
    if (!sectors[stock.sector]) {
      sectors[stock.sector] = [];
    }
    sectors[stock.sector].push(stock);
  }

  // Sort each sector's stocks by volume and take the top 10
  for (const sector in sectors) {
    sectors[sector].sort((a, b) => b.volume - a.volume);
    sectors[sector] = sectors[sector].slice(0, 10);
  }

  console.log(sectors);
  return sectors;
};

export { fetchBiggestGainers, fetchMostPopular, fetchMostPopularBySector };
