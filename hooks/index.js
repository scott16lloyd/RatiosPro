import { useQuery } from '@tanstack/react-query';

const fetchBiggestGainers = async () => {
  // Provides a list of the stocks that have gained the most value on a given day
  const response = await fetch(
    `https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=1b230136e8ddd66509145f0916c72ac6`
  );
  const data = await response.json();
  return data;
};

const fetchMostPopular = async () => {
  // Provides a list of the stocks that have the highest trading volume on a given day
  const response = await fetch(
    `https://financialmodelingprep.com/api/v3/stock_market/actives?apikey=1b230136e8ddd66509145f0916c72ac6`
  );
  const data = await response.json();
  return data;
};

export { fetchBiggestGainers, fetchMostPopular };
