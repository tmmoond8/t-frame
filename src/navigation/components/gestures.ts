import React from "react";
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
  React.useEffect(() => {
    const touchStartEvent = (e: TouchEvent) => {
      const { changedTouches } = e;
      gestureData.start = {
        x: changedTouches[0].clientX,
        y: changedTouches[0].clientY,
      };
    };

    const touchMoveEvent = (e: TouchEvent) => {
      const { changedTouches } = e;
      gestureData.end = {
        x: changedTouches[0].clientX,
        y: changedTouches[0].clientY,
      };
    };

    window.addEventListener("touchstart", touchStartEvent);
    window.addEventListener("touchmove", touchMoveEvent);

    return () => {
      window.removeEventListener("touchstart", touchStartEvent);
      window.removeEventListener("touchmove", touchMoveEvent);
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
