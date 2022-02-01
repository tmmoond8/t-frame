import React from "react";
import { ScreenStack } from "../modules/Stack";

const StackContext = React.createContext<ScreenStack>(null!);

interface Props {
  children: React.ReactNode;
  stack: ScreenStack;
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
