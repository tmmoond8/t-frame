import React from "react";

interface Arguments {}
type Handler = (args: Arguments) => void;

export const createHistory = () => {
  const listenres = createEvents();
  const history = {
    listen(listener: Handler) {
      const removeListener = listenres.push(listener);
      return removeListener;
    },
    push(path: string) {
      window.history.pushState({ path }, "", path);
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
    call(args: Arguments) {
      handlers.forEach((func) => func(args));
    },
  };
}

const HistoryContext = React.createContext<{
  history: ReturnType<typeof createHistory>;
}>(null!);

interface Props {
  history: ReturnType<typeof createHistory>;
}

export const HistoryContextProvider = ({ history }: Props) => {
  return (
    <HistoryContext.Provider value={{ history }}></HistoryContext.Provider>
  );
};
