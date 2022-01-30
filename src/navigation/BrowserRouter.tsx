import React from "react";
import styled from "@emotion/styled";
import { createHistory } from "./history";
import { createStack } from "./Stack";
import Router from "./Router";
import { StackContextProvider } from "./Stack.Context";
import Header from "./Header";

interface Props {
  children: React.ReactNode;
}

export default function BrowserRouter({ children }: Props) {
  const stack = createStack();
  const history = createHistory(stack);
  return (
    <StackContextProvider stack={stack}>
      <Router history={history} stack={stack}>
        <FullSizeWrapper>
          <Header />
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
`;
