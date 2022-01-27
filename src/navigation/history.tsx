import React from "react";

type Handler = (location: string) => void;

export const createHistory = () => {
  const listenres = createEvents();
  const history = {
    listen(listener: Handler) {
      console.log("history listen");
      const removeListener = listenres.push(listener);
      return removeListener;
    },
    push(path: string) {
      console.log("history push", path);
      console.log("window.history", window.history);
      window.history.pushState({ path }, "", path);
      listenres.call(path);
    },
  };

  return history;
};

function createEvents() {
  let handlers: Handler[] = [];

  return {
    push(func: Handler) {
      console.log("handlers push", handlers.length + 1);
      handlers.push(func);
      const removeHandler = () => {
        handlers = handlers.filter((handler) => handler !== func);
      };
      return removeHandler;
    },
    call(location: string) {
      console.log("handlers call");
      handlers.forEach((func) => func(location));
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
