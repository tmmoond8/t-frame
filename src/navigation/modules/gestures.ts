import React from "react";
import { throttle } from "throttle-debounce";
import type { GestureData } from "../types";

interface GestureParams {
  startX: number;
  endX: number;
}

export const isBackGesture = ({ startX, endX }: GestureParams) => {
  const isBackGesture1 = startX < 50 && endX < 0;
  const isBackGesture2 = endX - startX > 50;
  return isBackGesture1 || isBackGesture2;
};

export const isForwardGesture = ({ startX, endX }: GestureParams) => {
  const deviceWidth = window.innerWidth;
  const isForwardGesture1 = endX < 0;
  const isForwardGesture2 = startX > deviceWidth - 50 && startX - endX > 15;
  return isForwardGesture1 || isForwardGesture2;
};

export function useGestureData() {
  const gestureData = React.useRef<GestureData>({
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
    gestureBack: false,
    gestureForward: false,
    deltaX: 0,
    isBack: false,
    isForward: false,
    timers: {
      gestureBack: setTimeout(() => {}),
      gestureForward: setTimeout(() => {}),
    }
  });

  return gestureData;
}

export function useTouchEvent(gestureData: GestureData) {
  const timer = React.useRef<ReturnType<typeof setTimeout>>();
  React.useEffect(() => {
    const touchStartEvent = (e: TouchEvent) => {
      console.log("touch start");
      const { changedTouches } = e;
      gestureData.start = {
        x: changedTouches[0].clientX,
        y: changedTouches[0].clientY,
      };
    };

    const touchMoveEvent = (e: TouchEvent) => {
      console.log("touch end");
      const { changedTouches } = e;
      gestureData.end = {
        x: changedTouches[0].clientX,
        y: changedTouches[0].clientY,
      };
      timer.current = setTimeout(() => {
        gestureData.start = {
          x: 0,
          y: 0,
        };
        gestureData.end = {
          x: 0,
          y: 0,
        };
      }, 1000);
    };

    window.addEventListener("touchstart", touchStartEvent);
    window.addEventListener("touchmove", touchMoveEvent);

    return () => {
      window.removeEventListener("touchstart", touchStartEvent);
      window.removeEventListener("touchmove", touchMoveEvent);
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  React.useEffect(() => {
    window.addEventListener("wheel", (e) => {
      gestureData.deltaX = e.deltaX;
    });

    window.addEventListener(
      "pointermove",
      throttle(500, (e) => {
        gestureData.deltaX = 0;
      })
    );
  }, []);
}

export const handleBackGesture = (gestureData: GestureData, prevPath?: string) => {
  if (
    isBackGesture({
      startX: gestureData.start.x,
      endX: gestureData.end.x,
    })
  ) {
    gestureData.gestureBack = true;
    clearTimeout(gestureData.timers.gestureBack);
    gestureData.timers.gestureBack = setTimeout(() => {
      gestureData.gestureBack = false;
    }, 1000);
  }
  const isSafariGestureBack = gestureData.deltaX < 0;
  const path = window.history.state?.path ?? "/";
  gestureData.isBack = 
    (gestureData.gestureBack || isSafariGestureBack) && 
    path === prevPath;
};

export const handleForwardGesture = (gestureData: GestureData, forwardPath?: string) => {
  if (
    isForwardGesture({
      startX: gestureData.start.x,
      endX: gestureData.end.x,
    })
  ) {
    console.log("set gestureForward", true);
    gestureData.gestureForward = true;
    clearTimeout(gestureData.timers.gestureForward);
    gestureData.timers.gestureForward = setTimeout(() => {
      gestureData.gestureForward = false;
    }, 1000);
  }
  const isSafariGestureForward = gestureData.deltaX > 0;
  const path = window.history.state?.path ?? "/";
  gestureData.isForward =
    (gestureData.gestureForward || isSafariGestureForward) &&
    path === forwardPath;
};
