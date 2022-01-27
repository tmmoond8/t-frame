import React from "react";
import { createHistory } from "./history";
import Router from "./Router";

interface Props {
  children: React.ReactNode;
}

export default function BrowserRouter({ children }: Props) {
  const history = createHistory();
  return <Router history={history}>{children}</Router>;
}
