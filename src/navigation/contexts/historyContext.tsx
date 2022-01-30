import React from "react";
import { ScreenStack } from "../modules/Stack";

const HistoryContext = React.createContext<{
  history: ReturnType<typeof createHistory>;
}>(null!);

interface Props {
  history: ReturnType<typeof createHistory>;
  children: React.ReactNode;
}

export const HistoryContextProvider = ({ history, children }: Props) => {
  return (
    <HistoryContext.Provider value={{ history }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => React.useContext(HistoryContext);

type Handler = (location: string) => void;

export const createHistory = (stack: ScreenStack) => {
  const listenres = createEvents();
  const history = {
    listen(listener: Handler) {
      console.info("history listen");
      const removeListener = listenres.push(listener);
      return removeListener;
    },
    push(path: string) {
      if (path === stack.current.screenName) {
        console.info(`now stack: ${path}`);
        return;
      }
      console.info("history push", path);
      console.info("window.history", window.history);
      window.history.pushState({ path }, "", path);
      stack.push(path);
      listenres.call(path);
    },
    pop() {
      console.info("history pop");
      stack.pop();
    },
  };

  return history;
};

function createEvents() {
  let handlers: Handler[] = [];

  return {
    push(func: Handler) {
      console.info("handlers push", handlers.length + 1);
      handlers.push(func);
      const removeHandler = () => {
        handlers = handlers.filter((handler) => handler !== func);
      };
      return removeHandler;
    },
    call(location: string) {
      console.info("handlers call", handlers.length);
      handlers.forEach((func) => func(location));
    },
  };
}
