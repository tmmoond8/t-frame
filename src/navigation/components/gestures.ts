import React from "react";
import { throttle } from "throttle-debounce";
import type { Timers, GestureData } from "../types";

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

export function useGesture(gestureData: GestureData) {
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

export const handleBackGesture = (gestureData: GestureData, timers: Timers) => {
  if (
    isBackGesture({
      startX: gestureData.start.x,
      endX: gestureData.end.x,
    })
  ) {
    gestureData.gestureBack = true;
    clearTimeout(timers.gestureBack);
    timers.gestureBack = setTimeout(() => {
      gestureData.gestureBack = false;
    }, 1000);
  }
};

export const handleForwardGesture = (
  gestureData: GestureData,
  timers: Timers
) => {
  if (
    isForwardGesture({
      startX: gestureData.start.x,
      endX: gestureData.end.x,
    })
  ) {
    console.log("set gestureForward", true);
    gestureData.gestureForward = true;
    clearTimeout(timers.gestureForward);
    timers.gestureForward = setTimeout(() => {
      gestureData.gestureForward = false;
    }, 1000);
  }
};
