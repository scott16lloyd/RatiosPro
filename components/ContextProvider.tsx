'use client';

import { createContext, useContext, useState } from 'react';

export const dataContext = createContext<any>(null);

export function DataContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState(null);

  console.log(data);
  return (
    <dataContext.Provider value={{ data, setData }}>
      {children}
    </dataContext.Provider>
  );
}
