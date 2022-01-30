import React from "react";
import Stack from "./Stack";

import { useRouterContext } from "./Router";

interface Props {
  path: any;
  component: React.FC;
}

export default function Route({ path, component }: Props) {
  const { location } = useRouterContext();
  const Component = component;

  return path.match(location) ? (
    <Stack>
      <Component />
    </Stack>
  ) : null;
}
