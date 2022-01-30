import React from "react";
import { useStack } from "../contexts/stackContext";

interface Props {
  children: React.ReactNode;
}

interface StackItem {
  id: number;
  screenName: string;
}

export default function Stack({ children }: Props) {
  const { all } = useStack();
  return <div>{children}</div>;
}

// export const createStack = () => {
//   const all = stack;

//   const prev = stack.length > 1 ? stack[Math.max(0, stack.length - 2)] : null;
//   const push = (screenName: string) =>
//     stack.push({
//       id: stack.length,
//       screenName,
//     });
//   const pop = () => stack.pop() ?? null;
//   return {
//     all,
//     current: () => stack[Math.max(0, stack.length - 1)],
//     prev,
//     push,
//     pop,
//     screens: stack.map(({ screenName }) => screenName),
//   };
// };

export class ScreenStack {
  private stack: StackItem[] = [];

  constructor() {
    this.stack = [
      {
        id: 0,
        screenName: window.location.pathname,
      },
    ];
  }

  get all() {
    return this.stack;
  }

  get prev() {
    return this.size > 1 ? this.stack[Math.max(0, this.size - 2)] : null;
  }

  get current() {
    return this.stack[Math.max(0, this.size - 1)];
  }

  get size() {
    return this.stack.length;
  }

  push(screenName: string) {
    return this.stack.push({
      id: this.size,
      screenName,
    });
  }

  pop() {
    return this.stack.pop() ?? null;
  }

  get screens() {
    return this.stack.map(({ screenName }) => screenName);
  }
}
