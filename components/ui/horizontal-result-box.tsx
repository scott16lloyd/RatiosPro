'use client';

import { JSX, SVGProps, useState, useRef, useEffect, useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Curve,
  LabelList,
  Polygon,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { HorizontalBarSkeleton } from './skeletons/horizontal-bar-skeleton';
import { Skeleton } from './skeletons/skeleton';

const data = [
  {
    name: 'Page A',
    uv: 50,
    max: 100,
  },
];

const CustomBarBackground = (props: any) => {
  const { x, y, width, height } = props;

  return (
    <rect x={x} y={y} width={width} height={height} fill="#eee" rx={8} ry={8} />
  );
};

function useContainerDimensions(): [
  React.RefObject<HTMLDivElement>,
  { width: number; height: number }
] {
  const ref = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: ref.current ? ref.current.clientWidth : 0,
    height: ref.current ? ref.current.clientHeight : 0,
  });

  useEffect(() => {
    if (ref.current) {
      setDimensions({
        width: ref.current.clientWidth,
        height: ref.current.clientHeight,
      });
    }

    const handleResize = () => {
      if (ref.current) {
        setDimensions({
          width: ref.current.clientWidth,
          height: ref.current.clientHeight,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ref]);

  return [ref, dimensions];
}

export function HorizontalResultBox() {
  const [ref, dimensions] = useContainerDimensions();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust this delay to match the loading time of your chart

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Calculate margins as a percentage of container size
  const margin = {
    top: dimensions.height * 0.3,
    right: dimensions.width * 0.15,
    left: dimensions.width * 0.15,
    bottom: dimensions.height * 0.15,
  };
  return (
    <div className="w-full h-full p-2 bg-secondary rounded-2xl flex flex-col items-center">
      <div className="flex h-1/2 flex-row justify-between items-center px-2 w-full">
        <span className="text-sm md:text-xl lg:text-2xl">PSR</span>
        <span className="text-sm md:text-xl lg:text-2xl text-gradient font-bold">
          1.2
        </span>
      </div>
      <ResponsiveContainer width="100%" height="50%">
        {isLoading ? (
          <HorizontalBarSkeleton />
        ) : (
          <BarChart data={data} barCategoryGap={0} layout="vertical">
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
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis dataKey="name" type="category" hide />
            <Bar
              dataKey="uv"
              fill="url(#gradient)"
              radius={[8, 8, 8, 8]}
              background={<CustomBarBackground />}
            ></Bar>
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
