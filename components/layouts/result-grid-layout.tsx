import { SmallResultBox } from '@/components/ui/small-result-box';
import { VerticalResultBox } from '@/components/ui/vertical-result-box';

// Ratio data interface
interface RatiosData {
  symbol: string;
  date: string;
  calendarYear: string;
  period: string;
  currentRatio: number;
  quickRatio: number;
  returnOnEquity: number;
  returnOnAssets: number;
  receivablesTurnover: number;
  debtEquityRatio: number;
  priceEarningsRatio: number;
  priceToSalesRatio: number;
  priceToBookRatio: number;
}

interface ResultGridLayoutProps {
  data: RatiosData[];
}

export default function resultGridLayout({ data }: ResultGridLayoutProps) {
  console.log(data);
  // Round the values to two decimal places
  const roundedData = data.map((item) => ({
    ...item,
    calendarYear:
      item.calendarYear !== null ? parseFloat(item.calendarYear) : 0,
    currentRatio:
      item.currentRatio !== null ? parseFloat(item.currentRatio.toFixed(1)) : 0,
    quickRatio:
      item.quickRatio !== null ? parseFloat(item.quickRatio.toFixed(1)) : 0,
    returnOnEquity:
      item.returnOnEquity !== null
        ? parseFloat(item.returnOnEquity.toFixed(1))
        : 0,
    returnonAssets:
      item.returnOnAssets !== null
        ? parseFloat(item.returnOnAssets.toFixed(1))
        : 0,
    receivablesTurnover:
      item.receivablesTurnover !== null
        ? parseFloat(item.receivablesTurnover.toFixed(1))
        : 0,
    debtEquityRatio:
      item.debtEquityRatio !== null
        ? parseFloat(item.debtEquityRatio.toFixed(1))
        : 0,
    priceEarningsRatio:
      item.priceEarningsRatio !== null
        ? parseFloat(item.priceEarningsRatio.toFixed(1))
        : 0,
    priceSalesRatio:
      item.priceToSalesRatio !== null
        ? parseFloat(item.priceToSalesRatio.toFixed(1))
        : 0,
    priceToBookValue:
      item.priceToBookRatio !== null
        ? parseFloat(item.priceToBookRatio.toFixed(1))
        : 0,
  }));
  return (
    <div className="w-11/12 h-full flex items-center justify-center pt-4 pb-4">
      <div className="grid grid-cols-customSmall md:grid-cols-custom gap-2 md:gap-4 w-[1000px] mx-auto auto-rows-min">
        {roundedData[0].currentRatio && roundedData[1].currentRatio ? (
          <SmallResultBox
            ratioName="CR"
            prevValue={roundedData[1].currentRatio}
            prevYear={roundedData[1].calendarYear}
            currValue={roundedData[0].currentRatio}
            currYear={roundedData[0].calendarYear}
          />
        ) : null}
        {roundedData[0].returnonAssets && roundedData[1].returnonAssets ? (
          <VerticalResultBox
            ratioName="ROA"
            value={[
              [roundedData[0].returnonAssets, roundedData[0].calendarYear],
              [roundedData[1].returnonAssets, roundedData[1].calendarYear],
            ]}
          />
        ) : null}

        {roundedData[0].receivablesTurnover &&
        roundedData[1].receivablesTurnover ? (
          <VerticalResultBox
            ratioName="RT"
            value={[
              [roundedData[0].receivablesTurnover, roundedData[0].calendarYear],
              [roundedData[1].receivablesTurnover, roundedData[1].calendarYear],
            ]}
          />
        ) : null}
        {roundedData[0].quickRatio && roundedData[1].quickRatio ? (
          <SmallResultBox
            ratioName="QR"
            prevValue={roundedData[1].quickRatio}
            prevYear={roundedData[1].calendarYear}
            currValue={roundedData[0].quickRatio}
            currYear={roundedData[0].calendarYear}
          />
        ) : null}
        {roundedData[0].returnOnEquity && roundedData[1].returnOnEquity ? (
          <VerticalResultBox
            ratioName="ROE"
            value={[
              [roundedData[0].returnOnEquity, roundedData[0].calendarYear],
              [roundedData[1].returnOnEquity, roundedData[1].calendarYear],
            ]}
          />
        ) : null}
        {roundedData[0].debtEquityRatio && roundedData[1].debtEquityRatio ? (
          <SmallResultBox
            ratioName="DE"
            prevValue={roundedData[1].debtEquityRatio}
            prevYear={roundedData[1].calendarYear}
            currValue={roundedData[0].debtEquityRatio}
            currYear={roundedData[0].calendarYear}
          />
        ) : null}
        {roundedData[0].priceEarningsRatio &&
        roundedData[1].priceEarningsRatio ? (
          <SmallResultBox
            ratioName="PE"
            prevValue={roundedData[1].priceEarningsRatio}
            prevYear={roundedData[1].calendarYear}
            currValue={roundedData[0].priceEarningsRatio}
            currYear={roundedData[0].calendarYear}
          />
        ) : null}
        {roundedData[0].priceSalesRatio && roundedData[1].priceSalesRatio ? (
          <SmallResultBox
            ratioName="PSR"
            prevValue={roundedData[1].priceSalesRatio}
            prevYear={roundedData[1].calendarYear}
            currValue={roundedData[0].priceSalesRatio}
            currYear={roundedData[0].calendarYear}
          />
        ) : null}
        {roundedData[0].priceToBookValue && roundedData[1].priceToBookValue ? (
          <SmallResultBox
            ratioName="PBR"
            prevValue={roundedData[1].priceToBookValue}
            prevYear={roundedData[1].calendarYear}
            currValue={roundedData[0].priceToBookValue}
            currYear={roundedData[0].calendarYear}
          />
        ) : null}
      </div>
    </div>
  );
}
