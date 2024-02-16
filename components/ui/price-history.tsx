'use client';

import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  TooltipProps,
  ResponsiveContainer,
} from 'recharts';
import { SetStateAction, use, useEffect, useState } from 'react';
import { format, parse, set } from 'date-fns';
import { Button } from './button';
import { BentoSkeleton } from './skeletons/bento-skeleton';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchStockPriceHistory5Mins, fetchDailyCharts } from '@/hooks/index';

type DataItem = {
  date: string;
  open: number;
  low: number;
  high: number;
  close: number;
  volume: number;
};

// let data1D = [
//   { date: '22-12-2023', price: 193.6 },
//   { date: '22-12-2023', price: 193.65 },
//   { date: '22-12-2023', price: 193.7 },
//   { date: '22-12-2023', price: 193.75 },
//   { date: '22-12-2023', price: 193.8 },
//   { date: '22-12-2023', price: 193.85 },
//   { date: '22-12-2023', price: 193.6 },
//   { date: '22-12-2023', price: 193.65 },
//   { date: '22-12-2023', price: 193.7 },
//   { date: '22-12-2023', price: 193.75 },
//   { date: '22-12-2023', price: 193.8 },
//   { date: '22-12-2023', price: 193.85 },
//   { date: '22-12-2023', price: 194.1 },
//   { date: '22-12-2023', price: 194.15 },
// ];

// const data1W: SetStateAction<{ date: string; price: number }[]> = [];

// const dataYTD: SetStateAction<{ date: string; price: number }[]> = [];

// const dataY: SetStateAction<{ date: string; price: number }[]> = [];

// const data5Y: SetStateAction<{ date: string; price: number }[]> = [];

// const dataMax: SetStateAction<{ date: string; price: number }[]> = [];

// Calculates the domain and interval for the Y axis
function calculateDomain(data: DataItem[]) {
  const prices = data.map((item) => item.close);
  const min = Math.floor(Math.min(...prices) / 2) * 2;
  const max = Math.ceil(Math.max(...prices) / 10) * 10;
  const interval = (max - min) / 5;
  return { domain: [min, max], interval: Math.ceil(interval) };
}

// Custom tooltip for the chart
function CustomTooltip({ payload, label, active }: TooltipProps<any, any>) {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{ backgroundColor: '#f5f5f5', padding: '10px', color: 'black' }}
      >
        <p className="label">{`Date : ${label}`}</p>
        <p className="intro">{`Price : $${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
}

// Button size type
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon' | 'xs' | null | undefined;

// Price history component
export function PriceHistory({ TickerSymbol }: { TickerSymbol: string }) {
  const [isClient, setIsClient] = useState(false);
  const [buttonSize, setButtonSize] = useState<ButtonSize>('default');
  const [activeButton, setActiveButton] = useState('1d');
  const [data1D, setData1D] = useState<DataItem[]>([]);
  const [data1W, setData1W] = useState<DataItem[]>([]);
  const [data1M, setData1M] = useState<DataItem[]>([]);
  const [data6M, setData6M] = useState<DataItem[]>([]);
  const [dataYTD, setDataYTD] = useState<DataItem[]>([]);
  const [dataY, setDataY] = useState<DataItem[]>([]);
  const [data5Y, setData5Y] = useState<DataItem[]>([]);
  const [currentData, setCurrentData] = useState<DataItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Adjust button size to fit screen
  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth >= 768) {
        setButtonSize('default');
      } else {
        setButtonSize('xs');
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Sets 'isClient' to true on client-side rendering and fetches data with error handling.
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Ticker symbol
  const symbol = TickerSymbol;

  // Define query options
  type QueryResult1 = {
    isLoading: boolean;
    error: Error | null;
    data?: DataItem[];
  };

  type QueryResult2 = {
    isLoading: boolean;
    error: Error | null;
    data?: DataItem[][];
  };

  // Quries intraday data
  const query1: UseQueryOptions<DataItem[], Error> = {
    queryKey: ['fetchStockPriceHistory5Mins', symbol],
    queryFn: fetchStockPriceHistory5Mins,
  };

  // Queries daily data
  const query2: UseQueryOptions<DataItem[][], Error> = {
    queryKey: ['fetchDailyCharts', symbol],
    queryFn: fetchDailyCharts,
  };

  const result1: QueryResult1 = useQuery(query1);
  const result2: QueryResult2 = useQuery(query2);

  useEffect(() => {
    if (result1.isLoading === false && result1.data) {
      setData1D(result1.data);
      setCurrentData(result1.data);
      setIsLoading(false);
    }
  }, [result1]);

  useEffect(() => {
    if (result2.isLoading === false && result2.data) {
      // Set the state variables with the fetched data
      setData1W(result2.data[0] as DataItem[]);
      setData1M(result2.data[1] as DataItem[]);
      setData6M(result2.data[2] as DataItem[]);
      setDataYTD(result2.data[3] as DataItem[]);
      setDataY(result2.data[4] as DataItem[]);
      setData5Y(result2.data[5] as DataItem[]);
      setIsLoading(false);
    }
  }, [result2]);

  // Set button to active if clicked
  const getButtonClass: (buttonName: string) => string = (buttonName) => {
    return activeButton === buttonName
      ? 'dark:bg-white hover:dark:bg-white text-black dark:hover:text-black'
      : '';
  };

  const changeColor = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  // Determine interval of x ticks
  const xInterval =
    currentData.length > 10 ? Math.floor(currentData.length / 5) : 0;

  useEffect(() => {
    switch (activeButton) {
      case '1d':
        if (data1D) setCurrentData(data1D);
        break;
      case '1w':
        if (data1W) setCurrentData(data1W);
        break;
      case '1m':
        if (data1M) setCurrentData(data1M);
        break;
      case '6m':
        if (data6M) setCurrentData(data6M);
        break;
      case 'ytd':
        if (dataYTD) setCurrentData(dataYTD);
        break;
      case 'y':
        if (dataY) setCurrentData(dataY);
        break;
      case '5y':
        if (data5Y) setCurrentData(data5Y);
        break;
      default:
        // setInterval(5);
        if (data1D) setCurrentData(data1D);
        console.log(currentData); // default to data1D
    }
  }, [activeButton, data1D, data1W, data1M, currentData]);

  // Load and error handling for data queries

  if (!symbol) return 'No symbol provided';

  if (result1.error || result2.error)
    return `An error has occurred: ${result1.error || result2.error}`;

  return (
    <div className="w-full md:w-10/12 2xl:w-8/12 h-full">
      {isClient &&
        (result2.isLoading || result1.isLoading || isLoading ? (
          <div className="w-full h-full flex justify-center items-center pb-4">
            <BentoSkeleton />
          </div>
        ) : currentData && currentData.length === 0 ? (
          <div className="w-full h-full flex justify-center items-center">
            <h1>No data available</h1>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              key={currentData.map((item) => item.date).join('-')}
              width={500}
              height={300}
              data={currentData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <XAxis
                interval={xInterval}
                dataKey="date"
                tickFormatter={(value) => {
                  let formatString, displayFormat;
                  if (value.length === 19) {
                    formatString = 'yyyy-MM-dd HH:mm:ss';
                    displayFormat = 'HH:mm';
                  } else if (currentData.length < 200) {
                    formatString = 'yyyy-MM-dd';
                    displayFormat = 'dd-MMM';
                  } else if (currentData.length >= 200) {
                    formatString = 'yyyy-MM-dd';
                    displayFormat = 'yyyy';
                  } else {
                    formatString = 'yyyy-MM-dd';
                    displayFormat = 'dd-MMM-yy';
                  }
                  const parsedDate = parse(value, formatString, new Date());
                  return format(parsedDate, displayFormat);
                }}
                ticks={currentData.slice(1).map((item) => item.date)}
              />

              <YAxis domain={calculateDomain(currentData).domain} />
              <Tooltip
                content={CustomTooltip}
                labelFormatter={(value) =>
                  format(new Date(value), 'd MMM yyyy')
                }
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop
                    offset="50%"
                    style={{ stopColor: 'hsla(120, 65%, 53%, 1)' }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: 'hsla(120, 100%, 37%, 1)' }}
                  />
                </linearGradient>
              </defs>
              <Line
                type="linear"
                dataKey="close"
                stroke="url(#gradient)"
                dot={false}
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        ))}
      <div className="w-full flex flex-row items-center justify-center sm:gap-2 md:gap-4">
        <Button
          variant="outline"
          size={buttonSize}
          onClick={() => setActiveButton('1d')}
          className={getButtonClass('1d')}
        >
          1D
        </Button>
        <Button
          variant="outline"
          size={buttonSize}
          onClick={() => setActiveButton('1w')}
          className={getButtonClass('1w')}
        >
          1W
        </Button>
        <Button
          variant="outline"
          size={buttonSize}
          onClick={() => changeColor('1m')}
          className={getButtonClass('1m')}
        >
          1M
        </Button>
        <Button
          variant="outline"
          size={buttonSize}
          onClick={() => changeColor('6m')}
          className={getButtonClass('6m')}
        >
          6M
        </Button>
        <Button
          variant="outline"
          size={buttonSize}
          onClick={() => changeColor('ytd')}
          className={getButtonClass('ytd')}
        >
          YTD
        </Button>
        <Button
          variant="outline"
          size={buttonSize}
          onClick={() => changeColor('y')}
          className={getButtonClass('y')}
        >
          Y
        </Button>
        <Button
          variant="outline"
          size={buttonSize}
          onClick={() => changeColor('5y')}
          className={getButtonClass('5y')}
        >
          5Y
        </Button>
      </div>
    </div>
  );
}
