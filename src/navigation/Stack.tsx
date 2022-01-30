import React from "react";
import { useStack } from "./Stack.Context";

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

export const createStack = () => {
  const stack: StackItem[] = [
    {
      id: 0,
      screenName: window.location.pathname,
    },
  ];
  const all = stack;

  const prev = stack.length > 1 ? stack[Math.max(0, stack.length - 2)] : null;
  const push = (screenName: string) =>
    stack.push({
      id: stack.length,
      screenName,
    });
  const pop = () => stack.pop() ?? null;
  return {
    all,
    current: () => stack[Math.max(0, stack.length - 1)],
    prev,
    push,
    pop,
    screens: stack.map(({ screenName }) => screenName),
  };
};
