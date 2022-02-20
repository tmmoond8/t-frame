export interface Timers {
  gestureBack: ReturnType<typeof setTimeout>;
  gestureForward: ReturnType<typeof setTimeout>;
}

interface Point {
  x: number;
  y: number;
}

export interface GestureData {
  start: Point;
  end: Point;
  gestureBack: boolean;
  gestureForward: boolean;
  deltaX: number;
  isBack: boolean;
  isForward: boolean;
}
