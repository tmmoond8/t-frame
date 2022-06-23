import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useUiContext } from "../../contexts/uiContext";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Tabs({ children, className }: Props) {
  const { platform } = useUiContext();

  const childrenType = toString.call(children);
  const activatedTabs = React.useRef<Set<string>>(new Set());
  const routes = React.useMemo(() => {
    return childrenType === "[object Array]" ? (children as any[]) : [children];
  }, [childrenType, children]);
  const tabIndex = React.useRef(
    routes.findIndex(({ props }) => globalThis.location.pathname === props.path)
  );

  const [currentTab, setCurrentTab] = React.useState(
    routes.length === 0 ? null : routes[tabIndex.current].props.name
  );

  activatedTabs.current.add(currentTab);

  const getTranslateDirection = (index: number) => {
    let translateDirection: "none" | "right" | "left" = "none";
    if (platform === "Android" || platform === "Web") {
      return translateDirection;
    }
    if (tabIndex.current > index) {
      translateDirection = "right";
    }
    if (tabIndex.current < index) {
      translateDirection = "left";
    }
    return translateDirection;
  };

  return (
    <StyledTabs className={className}>
      <Body className="TabContent">
        {routes.map(({ props }, i) => {
          const Component = props.component;
          return (
            <TabWrapper
              key={props.name}
              className="TabPageWrapper"
              isCurrentTab={props.name === currentTab}
              translateDirection={getTranslateDirection(i)}
            >
              <Component />
            </TabWrapper>
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
              globalThis.history.replaceState(null, "", props.path);
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

const TabWrapper = styled.section<{
  isCurrentTab: boolean;
  translateDirection: "right" | "left" | "none";
}>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out;
  overflow-x: hidden;
  overflow-y: auto;
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
  ${(p) =>
    p.translateDirection === "right" &&
    css`
      transform: translate3d(20px, 0, 0);
    `}
  ${(p) =>
    p.translateDirection === "left" &&
    css`
      transform: translate3d(-20px, 0, 0);
    `}
  ${(p) =>
    p.translateDirection === "none" &&
    css`
      transform: translate3d(0, 0, 0);
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
  z-index: 10;

  &::after {
    content: "";
    position: absolute;
    top: -1px;
    width: calc(100% / ${(p) => p.count});
    left: calc((100% / ${(p) => p.count}) * ${(p) => p.currentIndex});
    transition: left 0.2s ease-out;
    height: 1px;
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
