import React from "react";
import styled from "@emotion/styled";
import { createHistory } from "../contexts/historyContext";
import { ScreenStack } from "../modules/Stack";
import Router from "./Router";
import { StackContextProvider } from "../contexts/stackContext";
import Header from "./Header";
import DevLog from "./DevLog";

interface Props {
  children: React.ReactNode;
  screenOptions?: {
    headerStyle: React.CSSProperties;
    headerTintColor?: string;
    headerTitleStyle: React.CSSProperties;
  };
}

export default function BrowserRouter({ children, screenOptions }: Props) {
  const stack = new ScreenStack();
  const history = createHistory(stack);
  return (
    <StackContextProvider stack={stack}>
      <Router history={history} stack={stack}>
        <FullSizeWrapper>
          <DevLog />
          {screenOptions && <Header screenOptions={screenOptions} />}
          <Main>{children}</Main>
        </FullSizeWrapper>
      </Router>
    </StackContextProvider>
  );
}

const FullSizeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background: rgba(200, 200, 200, 0.5);
`;

const Main = styled.main`
  flex: 1;
  position: relative;
`;
