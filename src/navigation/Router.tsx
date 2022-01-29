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
  const { push, pop, all } = useStack();

  React.useEffect(() => {
    console.log("useEffect listen");
    const unlisten = history.listen((location) => {
      console.log("setLocation", location);
      setLocation(location);
      push(location);
    });

    return () => unlisten();
  });

  console.log("all", all());

  React.useEffect(() => {
    window.addEventListener("popstate", () => {
      const path = window.history.state?.path ?? "/";
      console.log("popstate", window.history);
      history.pop();
      setLocation(path);
      pop();
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

function useStack() {
  const stack = React.useRef<string[]>([]);

  return {
    current: () => stack.current[stack.current.length - 1],
    all: () => stack.current,
    pop: () => stack.current.pop(),
    push: (screenName: string) => stack.current.push(screenName),
  };
}
