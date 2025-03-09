import dayjs from 'dayjs';
import { ReactNode, createContext, useState } from 'react';

export const CurrentDateContext = createContext<{
  currentDate: string;
  setCurrentDate: (date: string) => void;
}>({ currentDate: dayjs().format('YYYY-MM-DD'), setCurrentDate: () => {} });

export const CurrentDateProvider = ({ children }: { children: ReactNode }) => {
  const [currentDate, setCurrentDate] = useState<string>('');

  return (
    <CurrentDateContext.Provider value={{ currentDate, setCurrentDate }}>
      {children}
    </CurrentDateContext.Provider>
  );
};
