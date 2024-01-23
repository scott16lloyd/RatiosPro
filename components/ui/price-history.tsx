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
import { useEffect, useState } from 'react';
import { format, parse } from 'date-fns';
import { Button } from './button';

// Temporary price history data
const data1M = [
  { date: '22-12-2023', price: 193.6 },
  { date: '23-12-2023', price: 193.05 },
  { date: '24-12-2023', price: 193.15 },
  { date: '25-12-2023', price: 193.58 },
  { date: '26-12-2023', price: 192.53 },
  { date: '27-12-2023', price: 185.64 },
  { date: '28-12-2023', price: 184.25 },
  { date: '29-12-2023', price: 181.91 },
  { date: '30-12-2023', price: 181.18 },
  { date: '31-12-2023', price: 185.56 },
  { date: '01-01-2024', price: 185.14 },
  { date: '02-01-2024', price: 186.19 },
  { date: '03-01-2024', price: 185.59 },
  { date: '04-01-2024', price: 185.92 },
  { date: '05-01-2024', price: 183.63 },
  { date: '06-01-2024', price: 182.68 },
  { date: '07-01-2024', price: 188.63 },
  { date: '08-01-2024', price: 191.56 },
  { date: '09-01-2024', price: 191.23 },
  { date: '10-01-2024', price: 190.64 },
  { date: '11-01-2024', price: 191.45 },
  { date: '12-01-2024', price: 189.69 },
  { date: '13-01-2024', price: 189.71 },
  { date: '14-01-2024', price: 188.01 },
  { date: '15-01-2024', price: 187.44 },
  { date: '16-01-2024', price: 184.8 },
  { date: '17-01-2024', price: 189.97 },
  { date: '18-01-2024', price: 191.31 },
  { date: '19-01-2024', price: 190.64 },
  { date: '20-01-2024', price: 191.56 },
];

const data1D = [
  { date: '22-12-2023', price: 193.6 },
  { date: '22-12-2023', price: 193.65 },
  { date: '22-12-2023', price: 193.7 },
  { date: '22-12-2023', price: 193.75 },
  { date: '22-12-2023', price: 193.8 },
  { date: '22-12-2023', price: 193.85 },
  { date: '22-12-2023', price: 193.6 },
  { date: '22-12-2023', price: 193.65 },
  { date: '22-12-2023', price: 193.7 },
  { date: '22-12-2023', price: 193.75 },
  { date: '22-12-2023', price: 193.8 },
  { date: '22-12-2023', price: 193.85 },
  { date: '22-12-2023', price: 194.1 },
  { date: '22-12-2023', price: 194.15 },
];

// Calculates the domain and interval for the Y axis
function calculateDomain(data: any[]) {
  const prices = data.map((item) => item.price);
  const min = Math.floor(Math.min(...prices) / 10) * 10;
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
        <p className="intro">{`Price : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
}

// Button size type
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon' | 'xs' | null | undefined;

// Price history component
export function PriceHistory() {
  const [isClient, setIsClient] = useState(false);
  const [buttonSize, setButtonSize] = useState<ButtonSize>('xs');
  const [activeButton, setActiveButton] = useState('1d');
  const [currentData, setCurrentData] = useState(data1D);
  const [isLoading, setIsLoading] = useState(false);

  const getButtonClass: (buttonName: string) => string = (buttonName) => {
    return activeButton === buttonName
      ? 'dark:bg-white hover:dark:bg-white text-black dark:hover:text-black'
      : '';
  };

  const changeColor = (buttonName: string) => {
    setActiveButton(buttonName);

    switch (buttonName) {
      case '1d':
        setCurrentData(data1D);
        break;
      case '1m':
        setCurrentData(data1M);
        break;
      default:
        setCurrentData(data1D); // default to data1D
    }
  };

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth >= 768) {
        setButtonSize('default');
      } else {
        setButtonSize('xs');
      }
    };

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="w-full md:w-10/12 2xl:w-8/12 h-2/6">
      {isClient &&
        (isLoading ? (
          <h1>Loading...</h1>
        ) : currentData && currentData.length === 0 ? (
          <h1>No data available</h1>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
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
                interval={5}
                dataKey="date"
                tickFormatter={(value) => {
                  const parsedDate = parse(value, 'dd-MM-yyyy', new Date());
                  return format(parsedDate, 'd MMM');
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
              <Line
                type="linear"
                dataKey="price"
                stroke="#37D537"
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
          onClick={() => changeColor('1d')}
          className={getButtonClass('1d')}
        >
          1D
        </Button>
        <Button
          variant="outline"
          size={buttonSize}
          onClick={() => changeColor('1w')}
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
        <Button
          variant="outline"
          size={buttonSize}
          onClick={() => changeColor('max')}
          className={getButtonClass('max')}
        >
          MAX
        </Button>
      </div>
    </div>
  );
}
