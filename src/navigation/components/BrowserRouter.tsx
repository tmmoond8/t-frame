import React from "react";
import styled from "@emotion/styled";
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
  return (
    <StackContextProvider>
      <Router>
        <Layout>
          <DevLog />
          {screenOptions && <Header screenOptions={screenOptions} />}
          <Main>{children}</Main>
        </Layout>
      </Router>
    </StackContextProvider>
  );
}

const Layout = styled.div`
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
