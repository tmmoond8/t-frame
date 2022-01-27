import React from "react";

import { useRouterContext } from "../navigation";

interface Props {
  children: React.ReactElement | React.ReactElement[];
}

export default function Switch({ children }: Props) {
  const { location } = useRouterContext();

  const childrenType = toString.call(children);
  const routes = childrenType === "[object Array]" ? children : [children];
  const targetElement = (routes as React.ReactElement[]).find(
    (route) => route.props.path === location
  );
  return targetElement ?? null;
}
