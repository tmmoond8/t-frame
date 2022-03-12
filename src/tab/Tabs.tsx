import React from "react";
import styled from "@emotion/styled";

interface Props {
  children: React.ReactNode;
}

export default function Tabs({ children }: Props) {
  return <StyledTab>{children}</StyledTab>;
}

const StyledTab = styled.ol`
  position: relative;
  height: 100%;
  width: 100%;
`;
