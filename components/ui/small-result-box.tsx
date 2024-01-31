export function SmallResultBox() {
  return (
    <div className="w-full h-full min-h-24 p-2 bg-secondary rounded-2xl flex flex-col">
      <div className="flex flex-row justify-start px-2 w-full">
        <span className="text-base md:text-lg lg:text-xl xl:text-2xl">PSR</span>
      </div>
      <div className="flex flex-row justify-center items-center h-full w-full">
        <span className="text-3xl md:text-4xl lg:text-5xl text-gradient font-bold">
          1.2
        </span>
      </div>
    </div>
  );
}
