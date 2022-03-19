import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface Props {
  children: React.ReactNode;
}

export default function Tabs({ children }: Props) {
  const childrenType = toString.call(children);
  const tabIndex = React.useRef(0);
  const routes = React.useMemo(() => {
    return childrenType === "[object Array]" ? (children as any[]) : [children];
  }, [childrenType, children]);

  const [currentTab, setCurrentTab] = React.useState(
    routes.length === 0 ? null : routes[0].props.name
  );
  const route = routes.find(({ props }) => currentTab === props.name);
  const Component = route?.props.component;
  return (
    <StyledTab>
      <Body>
        <Component />
      </Body>
      <TabButtons currentIndex={tabIndex.current} count={routes.length}>
        {routes.map(({ props }, index) => (
          <TabButton
            isSelected={index === tabIndex.current}
            key={props.name}
            onClick={() => {
              setCurrentTab(props.name);
              tabIndex.current = index;
            }}
          >
            {props.icon && <Icon>{props.icon}</Icon>}
            {props.name}
          </TabButton>
        ))}
      </TabButtons>
    </StyledTab>
  );
}

const StyledTab = styled.ol`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 100%;
`;

const Body = styled.main`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
`;

const TabButtons = styled.ol<{ currentIndex: number; count: number }>`
  display: flex;
  height: 56px;
  width: 100%;
  position: relative;
  box-shadow: 0 -1px #ddd;

  &::after {
    content: "";
    position: absolute;
    width: calc(100% / ${(p) => p.count});
    left: calc((100% / ${(p) => p.count}) * ${(p) => p.currentIndex});
    transition: left 0.2s ease-out;
    height: 2px;
    background-color: black;
  }
`;

const TabButton = styled.li<{ isSelected: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #999;

  ${(p) =>
    p.isSelected &&
    css`
      color: black;
    `}
`;

const Icon = styled.span`
  margin-right: 8px;
`;
