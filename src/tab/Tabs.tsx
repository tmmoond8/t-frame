import React from "react";
import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Tabs({ children, className }: Props) {
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
    <StyledTabs className={className}>
      <Body className="TabContent">
        {routes
          .filter(({ props }) => activatedTabs.current.has(props.name))
          .map(({ props }) => {
            const Component = props.component;
            return (
              <TabWraper
                key={props.name}
                className="TabPageWrapper"
                isCurrentTab={props.name === currentTab}
              >
                <Component />
              </TabWraper>
            );
          })}
      </Body>
      <TabButtons
        className="TabButtons"
        currentIndex={tabIndex.current}
        count={routes.length}
      >
        {routes.map(({ props }, index) => (
          <TabButton
            className="TabButton"
            isSelected={index === tabIndex.current}
            key={props.name}
            onClick={() => {
              setCurrentTab(props.name);
              tabIndex.current = index;
            }}
          >
            {props.icon && <Icon className="TabIcon">{props.icon}</Icon>}
            <TabLabel className="TabLabel">{props.name}</TabLabel>
          </TabButton>
        ))}
      </TabButtons>
    </StyledTabs>
  );
}

const StyledTabs = styled.ol`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 100%;
`;

const fadeIn = keyframes`
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
`;

const TabWraper = styled.section<{ isCurrentTab: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  transition: opacity 0.3s ease-in-out;
  overflow-x: hidden;
  overflow-y: auto;
  animation: ${fadeIn} 0.3s ease-in-out;
  ${(p) =>
    p.isCurrentTab
      ? css`
          z-index: 10;
          opacity: 1;
          visibility: visible;
        `
      : css`
          z-index: 0;
          opacity: 0.4;
          visibility: hidden;
        `}
`;

const Body = styled.main`
  position: relative;
  flex: 1;
  overflow: hidden;
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
  &:active {
    background-color: #eee;
  }

  ${(p) =>
    p.isSelected &&
    css`
      color: black;
    `}
`;

const Icon = styled.span`
  padding: 0 8px;
`;

const TabLabel = styled.span``;
