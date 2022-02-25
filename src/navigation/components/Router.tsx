import React from "react";
import { createHistory } from "../contexts/historyContext";
import { useStack } from "../contexts/stackContext";
import { HistoryContextProvider } from "../contexts/historyContext";
import { useDevLog } from "./DevLog";
import {
  handleBackGesture,
  useTouchEvent,
  handleForwardGesture,
  useGestureData,
} from "../modules/gestures";
import type { GestureData } from "../types";
interface RouterContextObject {
  location: string;
  gestureData: GestureData;
}

const RouterContext = React.createContext<RouterContextObject>(null!);
if ("__DEV__" in window) {
  RouterContext.displayName = "Router";
}

export const useRouterContext = () => React.useContext(RouterContext);

interface Props {
  children: React.ReactNode;
}

export default function Router({ children }: Props) {
  const stack = useStack();
  const history = createHistory(stack);
  const [location, setLocation] = React.useState(window.location.pathname);
  const { setLog } = useDevLog();
  const gestureData = useGestureData();

  useTouchEvent(gestureData.current);

  React.useEffect(() => {
    const unlisten = history.listen((location) => {
      setLocation(location);
    });

    return () => unlisten();
  });

  React.useEffect(() => {
    const popStateEvent = (e: PopStateEvent) => {
      console.log("popstate", gestureData.current);
      const path = window.history.state?.path ?? "/";
      console.log("path", path);

      handleBackGesture(gestureData.current, stack?.prev?.path);
      handleForwardGesture(gestureData.current, stack.findTrash(stack.size)?.path);

      console.log("popstate", {
        xS: gestureData.current.start.x,
        xE: gestureData.current.end.x,
      });

      console.log("deltaX", gestureData.current.deltaX);
      if (gestureData.current.isBack) {
        gestureData.current.gestureBack = false;
        console.log("router gestureBack");
        stack.pop();
        setLocation(stack.current.path);
        return;
      }

      if (gestureData.current.isForward) {
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
      clearTimeout(gestureData.current.timers.gestureBack);
      clearTimeout(gestureData.current.timers.gestureForward);
    };
  }, []);

  return (
    <RouterContext.Provider
      value={{
        location,
        gestureData: gestureData.current,
      }}
    >
      <HistoryContextProvider history={history}>
        {children}
      </HistoryContextProvider>
    </RouterContext.Provider>
  );
}
