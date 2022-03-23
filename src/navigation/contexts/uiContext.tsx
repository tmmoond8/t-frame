import React from "react";
import type { Platform } from "../types";

interface UiContextValues {
  platform: Platform;
  changePlatform: (platform: Platform) => void;
}

const UiContext = React.createContext<UiContextValues>(null!);

interface Props {
  children: React.ReactNode;
  defaultPlatform: Platform;
}

export const UiContextProvider = ({ children, defaultPlatform }: Props) => {
  const [platform, setPlatform] = React.useState<Platform>("Cupertino");
  React.useEffect(() => {
    setPlatform(defaultPlatform);
  }, [defaultPlatform]);
  const changePlatform = React.useCallback((platform: Platform) => {
    setPlatform(platform);
    globalThis.location.reload();
  }, []);

  return (
    <UiContext.Provider value={{ platform, changePlatform }}>
      {children}
    </UiContext.Provider>
  );
};

export const useUiContext = () => React.useContext(UiContext);

export const usePlatform = () => {
  const { platform, changePlatform } = useUiContext();
  return {
    platform,
    changePlatform,
  };
};
