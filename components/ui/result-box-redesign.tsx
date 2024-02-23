export default function resultBoxRedesign({
  ratioName,
  prevValue,
  prevYear,
  currValue,
  currYear,
}: {
  ratioName: string;
  prevValue: number;
  prevYear: number;
  currValue: number;
  currYear: number;
}) {
  return (
    <div className="w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/4 aspect-square p-2 bg-secondary rounded-2xl flex flex-col">
      <div className="flex flex-row justify-start w-full h-1/3">
        <span className="text-lg md:text-3xl lg:text-4xl">{ratioName}</span>
      </div>
      <div className="flex flex-row justify-center items-center h-2/3 w-full gap-2">
        <div className="flex flex-col items-center">
          <span className="text-resultBoxSmall md:text-resultBoxMedium lg:text-resultBoxLarge text-gradient font-semibold border-r pr-2 border-white">
            {prevValue}
          </span>
          <span className="font-light text-xxs md:text-xs xl:text-md lg:text-lg mr-2">
            {prevYear}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-resultBoxSmall md:text-resultBoxMedium lg:text-resultBoxLarge text-gradient font-semibold">
            {currValue}
          </span>
          <span className="font-light text-xxs md:text-xs xl:text-md lg:text-lg">
            {currYear}
          </span>
        </div>
      </div>
    </div>
  );
}
