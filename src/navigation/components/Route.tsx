import React from "react";

interface Props {
  path: any;
  title: string;
  component: React.FC;
}

export default function Route({ title, component }: Props) {
  const Component = component;

  return <Component />;
}
