import React from "react";
import { createHistory } from "../contexts/historyContext";
import { ScreenStack } from "../modules/Stack";
import { HistoryContextProvider } from "../contexts/historyContext";
import { useDevLog } from "./DevLog";
import {
  handleBackGesture,
  useGesture,
  handleForwardGesture,
} from "./gestures";
import type { Timers, GestureData } from "../types";
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
  const { setLog } = useDevLog();
  const gestureData = React.useRef<GestureData>({
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
    gestureBack: false,
    gestureForward: false,
    deltaX: 0,
  });
  const timers = React.useRef<Timers>({
    gestureBack: setTimeout(() => {}),
    gestureForward: setTimeout(() => {}),
  });

  useGesture(gestureData.current);

  React.useEffect(() => {
    const unlisten = history.listen((location) => {
      setLocation(location);
    });

    return () => unlisten();
  });

  React.useEffect(() => {
    const popStateEvent = (e: PopStateEvent) => {
      const path = window.history.state?.path ?? "/";
      console.log("path", path);

      handleBackGesture(gestureData.current, timers.current);
      handleForwardGesture(gestureData.current, timers.current);

      console.log("popstate", {
        xS: gestureData.current.start.x,
        xE: gestureData.current.end.x,
      });

      if (gestureData.current.gestureBack && path === stack?.prev?.path) {
        gestureData.current.gestureBack = false;
        console.log("router gestureBack");
        stack.pop({ skipAnimation: true });
        setLocation(stack.current.path);
        return;
      }
      if (
        gestureData.current.gestureForward &&
        path === stack.findTrash(stack.size)?.path
      ) {
        gestureData.current.gestureForward = false;
        console.log("router gestureForward");
        stack.restore();
        setLocation(path);
        return;
      }

      if (stack.prev?.path === path) {
        history.pop({
          useHistory: false,
        });
      } else {
        console.log("router history push");
        history.push(path, {
          useHistory: false,
        });
      }

      setLocation(path);
    };

    window.addEventListener("popstate", popStateEvent);
    return () => {
      window.removeEventListener("popstate", popStateEvent);
      clearTimeout(timers.current.gestureBack);
      clearTimeout(timers.current.gestureForward);
    };
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
