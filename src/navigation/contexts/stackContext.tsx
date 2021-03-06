import React from "react";
import { StackManager } from "../modules/stackManager";

const StackContext = React.createContext<StackManager>(null!);

interface Props {
  children: React.ReactNode;
}

export const StackContextProvider = ({ children }: Props) => {
  const stack = new StackManager();
  return (
    <StackContext.Provider value={stack}>{children}</StackContext.Provider>
  );
};

export const useStack = () => React.useContext(StackContext);

export function useFocusEffect(func: () => React.EffectCallback | void) {
  const pathRef = React.useRef("");
  const stack = useStack();

  React.useEffect(() => {
    pathRef.current = window.location.pathname;
  }, []);

  React.useEffect(() => {
    let effect: React.EffectCallback;
    if (pathRef.current === window.location.pathname) {
      effect = func() ?? function () {};
    }
    return () => {
      if (effect) {
        effect();
      }
    };
  }, [stack.current.path]);
}
