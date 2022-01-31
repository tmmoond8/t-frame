import React from "react";
import { createHistory } from "../contexts/historyContext";
import { ScreenStack } from "../modules/Stack";
import { HistoryContextProvider } from "../contexts/historyContext";
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
  stack: ScreenStack;
}

export default function Router({ history, stack, children }: Props) {
  const [location, setLocation] = React.useState(window.location.pathname);

  React.useEffect(() => {
    console.log("useEffect listen");
    const unlisten = history.listen((location) => {
      // console.log("location", location, stack.current.screenName);
      setLocation(location);
    });

    return () => unlisten();
  });

  console.log("all", stack.all);

  React.useEffect(() => {
    window.addEventListener("popstate", (a) => {
      const path = window.history.state?.path ?? "/";
      console.log("popstate", path, a, window.history);
      if (stack.prev?.screenName === path) {
        history.pop();
      } else {
        history.push(path, false);
      }
      setLocation(path);
    });
  }, []);

  return (
    <RouterContext.Provider
      value={{
        location,
      }}
    >
      <HistoryContextProvider history={history}>
        {children}
      </HistoryContextProvider>
    </RouterContext.Provider>
  );
}
