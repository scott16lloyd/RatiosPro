'use client';

import { LineChart, XAxis, YAxis, Tooltip, Line, TooltipProps } from 'recharts';
import { useEffect, useState } from 'react';
import { format, parse } from 'date-fns';

const data = [
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

function calculateDomain(data: any[]) {
  const prices = data.map((item) => item.price);
  const min = Math.floor(Math.min(...prices) / 10) * 10;
  const max = Math.ceil(Math.max(...prices) / 10) * 10;
  const interval = (max - min) / 5;
  return { domain: [min, max], interval: Math.ceil(interval) };
}

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

export function PriceHistory() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? (
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 20,
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
        ticks={data.slice(1).map((item) => item.date)}
      />
      <YAxis domain={calculateDomain(data).domain} />
      <Tooltip
        content={CustomTooltip}
        labelFormatter={(value) => format(new Date(value), 'd MMM yyyy')}
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
  ) : (
    'Loading...'
  );
}
