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

interface Point {
  x: number;
  y: number;
}

export default function Router({ history, stack, children }: Props) {
  const [location, setLocation] = React.useState(window.location.pathname);
  const [log, setLog] = React.useState({});
  const { touchs } = useGesture();

  React.useEffect(() => {
    console.log("useEffect listen");
    const unlisten = history.listen((location) => {
      // console.log("location", location, stack.current.path);
      setLocation(location);
    });

    return () => unlisten();
  });

  console.log("ddd location", location);

  console.log("all", stack.all);

  React.useEffect(() => {
    const popStateEvent = (e: PopStateEvent) => {
      const path = window.history.state?.path ?? "/";

      if (touchs.current.gestureBack) {
        stack.pop({ skipAnimation: true });
        setLocation(stack.current.path);
        return;
      }

      console.log("popstate", path, e, window.history);
      if (stack.prev?.path === path) {
        history.pop({
          useHistory: false,
        });
      } else {
        history.push(path, {
          useHistory: false,
        });
      }

      setLocation(path);
    };
    window.addEventListener("popstate", popStateEvent);
    return () => {
      window.removeEventListener("popstate", popStateEvent);
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
        {/* <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            margin: "auto",
            width: "100px",
            height: "100px",
            wordWrap: "break-word",
            backgroundColor: "rgba(30, 30, 30, 0.5)",
            color: "white",
          }}
        >
          {Object.entries({
            gestureBack: touchs.current.gestureBack,
            path: window.history.state?.path ?? "/",
            stackSize: stack.size,
            location,
            currentPath: stack.current.path,
          })
            .map(([key, value]) => `${key}: ${value}`)
            .join(",")}
        </div> */}
        <div></div>
      </HistoryContextProvider>
    </RouterContext.Provider>
  );
}

function useGesture() {
  const timer = React.useRef<{
    gestureBack: ReturnType<typeof setTimeout>;
  }>({
    gestureBack: setTimeout(() => {}),
  });
  const touchs = React.useRef<{
    start: Point;
    end: Point;
    gestureBack: boolean;
    deltaX: number;
  }>({
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
    gestureBack: false,
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
      if (
        Math.floor(touchs.current.start.x) < 20 &&
        Math.floor(touchs.current.end.x) < 0
      ) {
        touchs.current.gestureBack = true;
        timer.current.gestureBack = setTimeout(() => {
          touchs.current.gestureBack = false;
        }, 1000);
      }
    };

    window.addEventListener("touchstart", touchStartEvent);
    window.addEventListener("touchend", touchEndEvent);

    return () => {
      window.removeEventListener("touchstart", touchStartEvent);
      window.removeEventListener("touchend", touchEndEvent);
      clearTimeout(timer.current.gestureBack);
    };
  }, []);

  React.useEffect(() => {
    const mouseWheelEvent = (e: Event) => {
      const deltaX = (e as WheelEvent).deltaX;
      if (deltaX < 0) {
        touchs.current.gestureBack = true;
        clearTimeout(timer.current.gestureBack);
        timer.current.gestureBack = setTimeout(() => {
          touchs.current.gestureBack = false;
        }, 1000);
      }
    };
    window.addEventListener("mousewheel", mouseWheelEvent);

    return () => {
      clearTimeout(timer.current.gestureBack);
    };
  }, []);

  return {
    touchs,
  };
}
