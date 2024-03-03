import { TopNavBar } from '@/components/ui/top-nav-bar';
import { SearchBar } from '@/components/ui/search-bar';
import { SmallBentoBox } from '@/components/ui/small-bento-box';
import { fetchBiggestGainers, fetchMostPopular } from '@/hooks';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import error from 'next/error';

export default function ViewAllPage({
  params,
}: {
  params: { category: string };
}) {
  const category = params.category;

  // Define query options
  type QueryResult = {
    isLoading: boolean;
    error: Error | null;
    data: any;
  };

  // Select fetch function based on category
  const queryBiggestGainers: UseQueryOptions<any, Error> = {
    queryKey: ['fetchBiggestGainers'],
    queryFn: fetchBiggestGainers,
  };

  const queryMostPopular: UseQueryOptions<any, Error> = {
    queryKey: ['fetchMostPopular'],
    queryFn: fetchMostPopular,
  };

  let queryResult: QueryResult | undefined;

  switch (category) {
    case 'biggestGainers':
      queryResult = useQuery(queryBiggestGainers);
      break;
    case 'mostPopular':
      queryResult = useQuery(queryMostPopular);
      break;
    default:
      throw new Error(`Unknown category: ${category}`);
  }

  if (queryResult.isLoading) {
    return <div>Loading...</div>;
  }

  if (queryResult.error) {
    return <div>Error: {queryResult.error.message}</div>;
  }
  return (
    <div className="flex min-h-screen flex-col items-center md:gap-4 overflow-x-hidden">
      <TopNavBar />
      <SearchBar />
      <div className="w-full h-full grid gap-4 grid-cols-3 grid-rows-3">
        <SmallBentoBox
          key={1}
          symbol={'data.symbol'}
          price={2}
          changesPercentage={10}
        />
      </div>
    </div>
  );
}
