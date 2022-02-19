import React from "react";
import { createHistory } from "../contexts/historyContext";
import { ScreenStack } from "../modules/Stack";
import { HistoryContextProvider } from "../contexts/historyContext";
import { useDevLog } from "./DevLog";

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

interface Point {
  x: number;
  y: number;
}

export default function Router({ history, stack, children }: Props) {
  const [location, setLocation] = React.useState(window.location.pathname);
  const { setLog } = useDevLog();

  const { touchs } = useGesture(setLog);

  // useEffect(() => {
  //   setLog(JSON.stringify(touchs));
  // }, [JSON.stringify(touchs)]);

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

      console.log("popstate", {
        xS: touchs.current.start.x,
        xE: touchs.current.end.x,
        forward: touchs.current.gestureForward,
      });

      if (touchs.current.gestureBack) {
        console.log("router gestureBack");
        stack.pop({ skipAnimation: true });
        setLocation(stack.current.path);
        return;
      }
      if (touchs.current.gestureForward) {
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
    return () => window.removeEventListener("popstate", popStateEvent);
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

function useGesture(setLog: any) {
  const timer = React.useRef<{
    gestureBack: ReturnType<typeof setTimeout>;
    gestureForward: ReturnType<typeof setTimeout>;
  }>({
    gestureBack: setTimeout(() => {}),
    gestureForward: setTimeout(() => {}),
  });
  const touchs = React.useRef<{
    start: Point;
    end: Point;
    gestureBack: boolean;
    gestureForward: boolean;
    deltaX: number;
  }>({
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
    gestureBack: false,
    gestureForward: false,
    deltaX: 0,
  });

  React.useEffect(() => {
    const touchStartEvent = (e: TouchEvent) => {
      const { changedTouches } = e;
      touchs.current.start = {
        x: changedTouches[0].clientX,
        y: changedTouches[0].clientY,
      };
    };

    const touchEndEvent = (e: TouchEvent) => {
      const { changedTouches } = e;
      touchs.current.end = {
        x: changedTouches[0].clientX,
        y: changedTouches[0].clientY,
      };
      const isBackGesture1 =
        Math.floor(touchs.current.start.x) < 50 &&
        Math.floor(touchs.current.end.x) < 0;
      const isBackGesture2 =
        Math.floor(touchs.current.end.x) - Math.floor(touchs.current.start.x) >
        50;

      if (isBackGesture1 || isBackGesture2) {
        touchs.current.gestureBack = true;
        timer.current.gestureBack = setTimeout(() => {
          touchs.current.gestureBack = false;
        }, 3000);
      }

      const deviceWidth = window.innerWidth;

      const isForwardGesture1 = Math.floor(touchs.current.end.x) < 0;
      const isForwardGesture2 =
        touchs.current.start.x > deviceWidth - 50 &&
        touchs.current.start.x - touchs.current.end.x > 80;
      if (isForwardGesture1 || isForwardGesture2) {
        console.log("set gestureForward", true);
        touchs.current.gestureForward = true;
        timer.current.gestureForward = setTimeout(() => {
          touchs.current.gestureForward = false;
        }, 3000);
      }
      setLog(
        JSON.stringify({ ...touchs, isForwardGesture1, isForwardGesture2 })
      );
    };

    const touchMoveEvent = (e: TouchEvent) => {
      const { changedTouches } = e;
      touchs.current.end = {
        x: changedTouches[0].clientX,
        y: changedTouches[0].clientY,
      };
      const isBackGesture1 =
        Math.floor(touchs.current.start.x) < 50 &&
        Math.floor(touchs.current.end.x) < 0;
      const isBackGesture2 =
        Math.floor(touchs.current.end.x) - Math.floor(touchs.current.start.x) >
        50;

      if (isBackGesture1 || isBackGesture2) {
        touchs.current.gestureBack = true;
        clearTimeout(timer.current.gestureBack);
        timer.current.gestureBack = setTimeout(() => {
          touchs.current.gestureBack = false;
        }, 1000);
      }

      const deviceWidth = window.innerWidth;

      const isForwardGesture1 = Math.floor(touchs.current.end.x) < 0;
      const isForwardGesture2 =
        touchs.current.start.x > deviceWidth - 50 &&
        touchs.current.start.x - touchs.current.end.x > 15;
      if (isForwardGesture1 || isForwardGesture2) {
        console.log("set gestureForward", true);
        touchs.current.gestureForward = true;
        clearTimeout(timer.current.gestureForward);
        timer.current.gestureForward = setTimeout(() => {
          touchs.current.gestureForward = false;
        }, 1000);
      }
    };

    window.addEventListener("touchstart", touchStartEvent);
    window.addEventListener("touchmove", touchMoveEvent);
    // window.addEventListener("touchend", touchEndEvent);

    return () => {
      window.removeEventListener("touchstart", touchStartEvent);
      window.removeEventListener("touchmove", touchMoveEvent);
      // window.removeEventListener("touchend", touchEndEvent);
      clearTimeout(timer.current.gestureBack);
      clearTimeout(timer.current.gestureForward);
    };
  }, []);

  // React.useEffect(() => {
  //   const mouseWheelEvent = (e: Event) => {
  //     const deltaX = (e as WheelEvent).deltaX;
  //     if (deltaX < 0) {
  //       touchs.current.gestureBack = true;
  //       clearTimeout(timer.current.gestureBack);
  //       timer.current.gestureBack = setTimeout(() => {
  //         touchs.current.gestureBack = false;
  //       }, 1000);
  //     }
  //   };
  //   window.addEventListener("mousewheel", mouseWheelEvent);

  //   return () => {
  //     clearTimeout(timer.current.gestureBack);
  //   };
  // }, []);

  return {
    touchs,
  };
}
