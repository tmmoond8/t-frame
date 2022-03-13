import React from "react";

interface Props {
  children: React.ReactNode;
  name: string;
}

export default function Tab({ children }: Props) {
  return <li>{children}</li>;
}
