import React from "react";
import styled from "@emotion/styled";
import Router from "./Router";
import { StackContextProvider } from "../contexts/stackContext";
import { UiContextProvider } from "../contexts/uiContext";
import Header, { ScreenOptions } from "./Header";
import DevLog from "./DevLog";
import type { Platform } from "../types";

interface Props extends ScreenOptions {
  children: React.ReactNode;
  defaultPlatform: Platform;
}

export default function BrowserRouter({
  children,
  screenOptions,
  defaultPlatform,
}: Props) {
  return (
    <UiContextProvider defaultPlatform={defaultPlatform}>
      <StackContextProvider>
        <Router>
          <Layout className="AppLayout">
            {/* <DevLog /> */}
            {screenOptions && <Header screenOptions={screenOptions} />}
            <Main className="AppMain">{children}</Main>
          </Layout>
        </Router>
      </StackContextProvider>
    </UiContextProvider>
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
  user-select: none;
`;

const Main = styled.main`
  flex: 1;
  position: relative;
  background-color: white;
`;
