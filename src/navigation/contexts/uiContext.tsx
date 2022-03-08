import React from "react";
import type { Pratform } from "../types";

interface UiContextValues {
  pratform: Pratform;
}

const UiContext = React.createContext<UiContextValues>(null!);

interface Props {
  children: React.ReactNode;
  pratform: Pratform;
}

export const UiContextProvider = ({ children, pratform: _pratform }: Props) => {
  const [pratform, setPratform] = React.useState<Pratform>("Cupertino");
  React.useEffect(() => {
    setPratform(_pratform);
  }, [_pratform]);
  return (
    <UiContext.Provider value={{ pratform }}>{children}</UiContext.Provider>
  );
};

export const useUiContext = () => React.useContext(UiContext);
