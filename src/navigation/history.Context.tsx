import React from "react";
import { createHistory } from "./history";

const HistoryContext = React.createContext<{
  history: ReturnType<typeof createHistory>;
}>(null!);

interface Props {
  history: ReturnType<typeof createHistory>;
  children: React.ReactNode;
}

export const HistoryContextProvider = ({ history, children }: Props) => {
  return (
    <HistoryContext.Provider value={{ history }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => React.useContext(HistoryContext);
