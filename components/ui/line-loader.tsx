import { Bars } from 'react-loader-spinner';
export function LineLoader() {
  return (
    <Bars
      height="40"
      width="40"
      color="white"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
}
