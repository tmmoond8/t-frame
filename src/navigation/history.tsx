import { createStack } from "./Stack";

type Handler = (location: string) => void;

export const createHistory = (stack: ReturnType<typeof createStack>) => {
  const listenres = createEvents();
  // const stack: string[] = [initPath];
  const history = {
    listen(listener: Handler) {
      console.info("history listen");
      const removeListener = listenres.push(listener);
      return removeListener;
    },
    push(path: string) {
      if (path === stack.current().screenName) {
        debugger;
        console.log(`now stack: ${path}`);
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
