import React from "react";
import styled from "@emotion/styled";
import { createHistory } from "../contexts/historyContext";
import { ScreenStack } from "../modules/Stack";
import Router from "./Router";
import { StackContextProvider } from "../contexts/stackContext";
import Header from "./Header";

interface Props {
  children: React.ReactNode;
}

export default function BrowserRouter({ children }: Props) {
  const stack = new ScreenStack();
  const history = createHistory(stack);
  return (
    <StackContextProvider stack={stack}>
      <Router history={history} stack={stack}>
        <FullSizeWrapper>
          <Header title={stack.current.path} />
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
