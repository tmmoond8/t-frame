import React from "react";
import { createStack } from "./Stack";

const StackContext = React.createContext<{
  current: () => StackItem;
  prev: StackItem | null;
  all: StackItem[];
  pop: () => StackItem | null;
  push: (screenName: string) => void;
}>(null!);

interface Props {
  children: React.ReactNode;
  stack: ReturnType<typeof createStack>;
}

interface StackItem {
  id: number;
  screenName: string;
}

export const StackContextProvider = ({ stack, children }: Props) => {
  return (
    <StackContext.Provider value={stack}>{children}</StackContext.Provider>
  );
};

export const useStack = () => React.useContext(StackContext);
