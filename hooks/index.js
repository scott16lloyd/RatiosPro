const fetchBiggestGainers = async () => {
  // Provides a list of the stocks that have gained the most value on a given day
  const response = await fetch(
    `https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const data = await response.json();
  console.log(data);

  // Filter out non-company stocks
  let companyStocks = data.filter((stock) => {
    if (!stock.name) return false;

    let name = stock.name.toLowerCase();
    return !(
      name.includes('etf') ||
      name.includes('shares') ||
      name.includes('trust') ||
      name.includes('fund') ||
      name.includes('index')
    );
  });

  // Filter by price
  let filteredData = companyStocks.filter((item) => item.price >= 1);
  console.log(filteredData);

  return filteredData;
};

const fetchMostPopular = async () => {
  // Provides a list of the stocks that have the highest trading volume on a given day
  const response = await fetch(
    `https://financialmodelingprep.com/api/v3/stock_market/actives?apikey=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const data = await response.json();

  // Filter out non-company stocks
  let companyStocks = data.filter((stock) => {
    if (!stock.name) return false;

    let name = stock.name.toLowerCase();
    return !(
      name.includes('etf') ||
      name.includes('shares') ||
      name.includes('trust') ||
      name.includes('fund') ||
      name.includes('index')
    );
  });

  // Filter by price
  let filteredData = companyStocks.filter((item) => item.price >= 1);
  console.log(filteredData);
  return filteredData;
};

/**
 * @typedef {Object} Stock
 * @property {string} symbol
 * @property {number} price
 * @property {number} changesPercentage
 * // Add other properties here based on the structure of your stock objects
 */

/**
 * Fetches most popular stocks by sector
 * @returns {Promise<Record<string, Stock[]>>}
 */

const fetchMostPopularBySector = async () => {
  // Fetch all stocks
  const response = await fetch(
    `https://financialmodelingprep.com/api/v3/stock-screener?apikey=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const stocks = await response.json();

  // Group stocks by sector and sort by volume
  const sectors = {};
  for (const stock of stocks) {
    if (!stock.sector || stock.isEtf || stock.isFund) continue;
    if (!sectors[stock.sector]) {
      sectors[stock.sector] = [];
    }
    sectors[stock.sector].push(stock);
  }

  // Sort each sector's stocks by volume and take the top 10
  for (const sector in sectors) {
    sectors[sector].sort((a, b) => b.volume - a.volume);
  }

  return sectors;
};

const fetchStockPriceHistory5Mins = async ({ queryKey }) => {
  const [_key, symbol] = queryKey;
  // Fetch 5 minute stock price history
  const response = await fetch(
    `https://financialmodelingprep.com/api/v3/historical-chart/5min/${symbol}?apikey=${process.env.NEXT_PUBLIC_API_KEY}`
  );

  // Stores previous trading week data
  const previousWeek = await response.json();

  // Get last trade date
  const lastTradeDate = previousWeek[0].date.split(' ')[0];

  // Filter by trade date
  const latestDay = previousWeek.filter((day) =>
    day.date.startsWith(lastTradeDate)
  );

  // Reverse the array to get the latest data first
  latestDay.reverse();
  return latestDay;
};

const fetchDailyCharts = async ({ queryKey }) => {
  const [_key, symbol] = queryKey;

  // Fetch daily price history up to last 5 years
  const response = await fetch(
    `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=${process.env.NEXT_PUBLIC_API_KEY}`
  );

  // Parse the response data as JSON
  const data = await response.json();

  // Return 1 week data
  let oneWeekData = data.historical.slice(0, 5);
  oneWeekData.reverse();

  // Return 1 month data
  let dateOneMonthAgo = new Date();
  dateOneMonthAgo.setMonth(dateOneMonthAgo.getMonth() - 1);
  dateOneMonthAgo = dateOneMonthAgo.toISOString().split('T')[0];
  let oneMonthData = data.historical.filter((day) => {
    return day.date >= dateOneMonthAgo;
  });
  oneMonthData.reverse();

  // Return 6 months data
  let dateSixMonthsAgo = new Date();
  dateSixMonthsAgo.setMonth(dateSixMonthsAgo.getMonth() - 6);
  dateSixMonthsAgo = dateSixMonthsAgo.toISOString().split('T')[0];
  let sixMonthsData = data.historical.filter((day) => {
    return day.date >= dateSixMonthsAgo;
  });
  sixMonthsData.reverse();

  // Return year to date
  let currentYear = new Date().getFullYear().toString();
  console.log(currentYear);
  let yearToDateData = data.historical.filter((day) => {
    return day.date.startsWith(currentYear);
  });
  yearToDateData.reverse();

  // Return 1 year data
  // Calculate the date one year ago from today
  let oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  oneYearAgo = oneYearAgo.toISOString().split('T')[0];

  // Filter the data for the last year
  let lastYearData = data.historical.filter((day) => {
    return day.date >= oneYearAgo;
  });
  lastYearData.reverse();

  // Return 5 years data
  let fiveYearsData = data.historical.slice(0, 1825);
  fiveYearsData.reverse();

  return [
    oneWeekData,
    oneMonthData,
    sixMonthsData,
    yearToDateData,
    lastYearData,
    fiveYearsData,
  ];
};

const fetchBalanceSheet = async ({ queryKey }) => {
  const [_key, symbol] = queryKey;

  // Fetch stock ratios
  const response = await fetch(
    `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${symbol}?period=annual&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
  );

  const data = await response.json();

  return data;
};

const fetchIncomeStatement = async ({ queryKey }) => {
  const [_key, symbol] = queryKey;

  // Fetch stock ratios
  const response = await fetch(
    `https://financialmodelingprep.com/api/v3/income-statement/${symbol}?period=annual&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
  );

  const data = await response.json();

  return data;
};

const fetchRatios = async ({ queryKey }) => {
  const [_key, symbol] = queryKey;

  // Fetch stock ratios
  const response = await fetch(
    `https://financialmodelingprep.com/api/v3/ratios/${symbol}?period=annual&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
  );

  const data = await response.json();
  console.log(data);

  return data;
};

const fetchSearchResultsPerformant = async ({ queryKey }) => {
  const [_key, search] = queryKey;

  // Fetch stock ratios
  const response = await fetch(
    `https://financialmodelingprep.com/api/v3/search?query=${search}&limit=8&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
  );

  const data = await response.json();

  // Define the order of exchanges
  const exchangeOrder = ['NASDAQ', 'NYSE'];

  // Sort the data
  data.sort((a, b) => {
    const aExchangeIndex = exchangeOrder.indexOf(a.exchangeShortName);
    const bExchangeIndex = exchangeOrder.indexOf(b.exchangeShortName);

    if (aExchangeIndex === -1 && bExchangeIndex === -1) {
      // Neither stock is in NASDAQ or NYSE, sort alphabetically
      return a.exchangeShortName.localeCompare(b.exchangeShortName);
    } else if (aExchangeIndex === -1) {
      // Stock 'a' is not in NASDAQ or NYSE, 'b' comes first
      return 1;
    } else if (bExchangeIndex === -1) {
      // Stock 'b' is not in NASDAQ or NYSE, 'a' comes first
      return -1;
    } else {
      // Both stocks are in NASDAQ or NYSE, sort based on the order in `exchangeOrder`
      return aExchangeIndex - bExchangeIndex;
    }
  });

  return data;
};

const fetchSearchResults = async ({ queryKey }) => {
  const [_key, search] = queryKey;

  // Fetch stock ratios
  const response = await fetch(
    `https://financialmodelingprep.com/api/v3/search?query=${search}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
  );

  const data = await response.json();

  // Define the order of exchanges
  const exchangeOrder = ['NASDAQ', 'NYSE'];

  // Sort the data
  data.sort((a, b) => {
    const aExchangeIndex = exchangeOrder.indexOf(a.exchangeShortName);
    const bExchangeIndex = exchangeOrder.indexOf(b.exchangeShortName);

    if (aExchangeIndex === -1 && bExchangeIndex === -1) {
      // Neither stock is in NASDAQ or NYSE, sort alphabetically
      return a.exchangeShortName.localeCompare(b.exchangeShortName);
    } else if (aExchangeIndex === -1) {
      // Stock 'a' is not in NASDAQ or NYSE, 'b' comes first
      return 1;
    } else if (bExchangeIndex === -1) {
      // Stock 'b' is not in NASDAQ or NYSE, 'a' comes first
      return -1;
    } else {
      // Both stocks are in NASDAQ or NYSE, sort based on the order in `exchangeOrder`
      return aExchangeIndex - bExchangeIndex;
    }
  });

  return data;
};

const fetchCompantProfile = async ({ queryKey }) => {
  const [_key, ticker] = queryKey;

  // Fetch stock ratios
  const response = await fetch(
    `https://financialmodelingprep.com/api/v3/profile/${ticker}?apikey=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const data = await response.json();
  // Extract specific values
  if (Array.isArray(data) && data.length > 0) {
    const { symbol, price, companyName, changes } = data[0];
    return { symbol, price, companyName, changes };
  } else {
    return null;
  }
};

export {
  fetchBiggestGainers,
  fetchMostPopular,
  fetchMostPopularBySector,
  fetchStockPriceHistory5Mins,
  fetchDailyCharts,
  fetchBalanceSheet,
  fetchIncomeStatement,
  fetchRatios,
  fetchSearchResults,
  fetchSearchResultsPerformant,
  fetchCompantProfile,
};
