import React from "react";
import { StackManager } from "../modules/stackManager";

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

interface PushOptions {
  state?: Record<string, any>;
  useHistory?: boolean;
}

interface PopOptions {
  useHistory?: boolean;
}

export const createHistory = (stack: StackManager) => {
  const listenres = createEvents();
  const history = {
    listen(listener: Handler) {
      console.info("history listen");
      const removeListener = listenres.push(listener);
      return removeListener;
    },
    push(path: string, { state = {}, useHistory = true }: PushOptions = {}) {
      if (path === stack.current.path) {
        console.info(`now stack: ${path}`);
        return;
      }
      console.info("history push", path);
      console.info("window.history", window.history);
      if (useHistory) {
        window.history.pushState({ ...state, path }, "", path);
      }
      stack.push(path);
      listenres.call(path);
    },
    pop({ useHistory = true }: PopOptions = {}) {
      console.info(`history pop - useHistory: ${useHistory}`);
      if (useHistory) {
        window.history.back();
        return;
      }
      stack.pop();
      listenres.call(stack.current.path);
    },
  };

  return history;
};

function createEvents() {
  let handlers: Handler[] = [];

  return {
    push(func: Handler) {
      handlers.push(func);
      const removeHandler = () => {
        handlers = handlers.filter((handler) => handler !== func);
      };
      return removeHandler;
    },
    call(location: string) {
      handlers.forEach((func) => func(location));
    },
  };
}
