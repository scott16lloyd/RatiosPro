import { ArrowRight } from 'lucide-react';

interface ComparisonItem {
  company: string;
  currentYear: number;
  previousYear: number;
}

interface HorizontalComparisonBoxProps {
  title: string;
  items: ComparisonItem[];
}

export default function HorizontalComparisonBox({
  title,
  items,
}: HorizontalComparisonBoxProps) {
  console.log('Title:', title);
  console.log('Items:', items);

  return (
    <div className="bg-secondary flex flex-col items-center py-2 px-2 md:px-4 lg:px-6 xl:px-2 2xl:px-3 rounded-lg w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 outline outline-zinc-700 outline-1 shadow-md shadow-zinc-900 scrollbar-hide">
      <h2 className="text-lg md:text-3xl lg:text-4xl xl:text-4xl mb-4 self-start">
        {title}
      </h2>
      {items && items.length > 0 ? (
        items.map((item, index) => (
          <div
            key={item.company}
            className={
              index !== 0
                ? 'mt-4 pt-4 border-t border-zinc-700 w-10/12'
                : 'w-10/12'
            }
          >
            <div className="text-lg font-medium">{item.company}</div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-400">2022</span>
                <span className="text-2xl font-bold">
                  {item.currentYear.toFixed(2)}
                </span>
              </div>
              <ArrowRight className="text-gray-400 mx-4" />
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-400">2023</span>
                <span className="text-2xl font-bold">
                  {item.previousYear.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400">No comparison data available.</p>
      )}
    </div>
  );
}
