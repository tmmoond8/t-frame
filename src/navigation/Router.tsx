import React from "react";
import { createHistory } from "./history";
import { HistoryContextProvider } from "./history.Context";
interface RouterContextObject {
  location: string;
}

const RouterContext = React.createContext<RouterContextObject>(null!);
if ("__DEV__" in window) {
  RouterContext.displayName = "Router";
}

export const useRouterContext = () => React.useContext(RouterContext);

interface Props {
  children: React.ReactNode;
  history: ReturnType<typeof createHistory>;
}

export default function Router({ history, children }: Props) {
  const [location, setLocation] = React.useState(window.location.pathname);
  return (
    <RouterContext.Provider value={{ location }}>
      <HistoryContextProvider history={history}>
        {children}
      </HistoryContextProvider>
    </RouterContext.Provider>
  );
}
