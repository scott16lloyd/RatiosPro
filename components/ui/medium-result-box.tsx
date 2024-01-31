'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
];

const COLORS = ['#00C49F', '#fff'];

export function MediumResultBox() {
  return (
    <div className="w-full h-full p-2 bg-secondary rounded-2xl flex flex-row justify-center">
      <div className="w-1/2 h-full flex flex-col text-left pl-2 justify-center">
        <span className="text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
          PSR
        </span>
        <span className="text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl text-gradient font-bold">
          1.2
        </span>
      </div>
      <div className="w-1/2 h-full flex flex-col items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <Pie data={data} labelLine={false} fill="#fff" dataKey="value">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
