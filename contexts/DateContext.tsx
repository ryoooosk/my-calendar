import dayjs from 'dayjs';
import { ReactNode, createContext, useState } from 'react';

export const DateContext = createContext<{
  date: string;
  setDate: (date: string) => void;
}>({ date: dayjs().format('YYYY-MM-DD'), setDate: () => {} });

export const DateProvider = ({ children }: { children: ReactNode }) => {
  const [date, setDate] = useState<string>('');

  return (
    // TODO: SelectedDate二変更する
    <DateContext.Provider value={{ date, setDate }}>
      {children}
    </DateContext.Provider>
  );
};
