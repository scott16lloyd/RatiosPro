'use client';

import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { BentoSkeleton } from './skeletons/bento-skeleton';

const data = [
  { name: 'Group A', value: 70 },
  { name: 'Group B', value: 30 },
];

const COLORS = ['url(#gradient)', '#fff'];

export function MediumResultBox({
  ratioName,
  value,
}: {
  ratioName: string;
  value: number;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust this delay to match the loading time of your chart

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return isLoading ? (
    <BentoSkeleton />
  ) : (
    <div className="w-full h-full p-2 bg-secondary rounded-2xl flex flex-row justify-center">
      <div className="w-1/2 h-full flex flex-col text-left pl-2 justify-center">
        <span className="text-base md:text-lg lg:text-xl xl:text-2xl">
          {ratioName ? ratioName : 'null'}
        </span>
        <span className="text-3xl md:text-4xl lg:text-4xl 2xl:text-5xl text-gradient font-bold">
          {value}
        </span>
      </div>
      <div className="w-1/2 h-full flex flex-col items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
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
            <Pie data={data} labelLine={false} fill="#fff" dataKey="value">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="none"
                  style={{ pointerEvents: 'none' }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
