import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface Props {
  children: React.ReactNode;
}

export default function Tabs({ children }: Props) {
  const childrenType = toString.call(children);
  const tabIndex = React.useRef(0);
  const activatedTabs = React.useRef<Set<string>>(new Set());
  const routes = React.useMemo(() => {
    return childrenType === "[object Array]" ? (children as any[]) : [children];
  }, [childrenType, children]);

  const [currentTab, setCurrentTab] = React.useState(
    routes.length === 0 ? null : routes[0].props.name
  );

  activatedTabs.current.add(currentTab);

  return (
    <StyledTab>
      <Body>
        {routes
          .filter(({ props }) => activatedTabs.current.has(props.name))
          .map(({ props }) => {
            const Component = props.component;
            return (
              <TabWraper isCurrentTab={props.name === currentTab}>
                <Component />
              </TabWraper>
            );
          })}
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

const TabWraper = styled.section<{ isCurrentTab: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  ${(p) =>
    p.isCurrentTab &&
    css`
      z-index: 10;
    `}
`;

const Body = styled.main`
  position: relative;
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
  &:hover {
    background-color: #eee;
  }

  ${(p) =>
    p.isSelected &&
    css`
      color: black;
    `}
`;

const Icon = styled.span`
  margin-right: 8px;
`;
