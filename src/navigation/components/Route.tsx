import React from "react";
import styled from "@emotion/styled";

interface Props {
  path: any;
  component: React.FC;
}

export default function Route({ path, component }: Props) {
  const Component = component;

  return <Component />;
}
