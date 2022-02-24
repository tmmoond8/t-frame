import React from "react";
import { StackManager } from "../modules/stackManager";

const StackContext = React.createContext<StackManager>(null!);

interface Props {
  children: React.ReactNode;
  stack: StackManager;
}

export const StackContextProvider = ({ stack, children }: Props) => {
  return (
    <StackContext.Provider value={stack}>{children}</StackContext.Provider>
  );
};

export const useStack = () => React.useContext(StackContext);

export function useFocusEffect(func: () => void) {
  const stack = useStack();
  React.useEffect(() => {
    console.log("useFocusEffect");
    func();
  }, [stack.current]);
}
