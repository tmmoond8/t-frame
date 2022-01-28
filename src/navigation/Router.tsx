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

  React.useEffect(() => {
    console.log("useEffect listen");
    const unlisten = history.listen((location) => {
      console.log("setLocation", location);
      setLocation(location);
    });

    return () => unlisten();
  });

  React.useEffect(() => {
    window.addEventListener("popstate", () => {
      const path = window.history.state?.path ?? "/";
      console.log("popstate", window.history);
      history.pop();
      setLocation(path);
    });
  }, []);

  return (
    <RouterContext.Provider value={{ location }}>
      <HistoryContextProvider history={history}>
        {children}
      </HistoryContextProvider>
    </RouterContext.Provider>
  );
}
