import React from "react";
import styled from "@emotion/styled";

interface Props {
  children: React.ReactNode;
}

export default function Tabs({ children }: Props) {
  const childrenType = toString.call(children);
  const routes = React.useMemo(() => {
    return childrenType === "[object Array]" ? (children as any[]) : [children];
  }, [childrenType, children]);

  const [currentTab, setCurrentTab] = React.useState(
    routes.length === 0 ? null : routes[0].props.name
  );
  const route = routes.find(({ props }) => currentTab === props.name);
  return (
    <StyledTab>
      <Body>{route?.props.children}</Body>
      <TabButtons>
        {routes.map(({ props }) => (
          <TabButton
            key={props.name}
            onClick={() => {
              setCurrentTab(props.name);
            }}
          >
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

const TabButtons = styled.ol`
  display: flex;
  height: 56px;
  width: 100%;
`;

const TabButton = styled.li`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
