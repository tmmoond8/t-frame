import React from "react";
import styled from "@emotion/styled";
import { useRouterContext } from "..";
import { useStack } from "../contexts/stackContext";
import Stack from "./Stack";
import { StackNode } from "../modules/stackManager";
import { useHeader } from "./Header";

interface Props {
  children: React.ReactElement | React.ReactElement[];
}

export default function Routes({ children }: Props) {
  const { location, gestureData } = useRouterContext();
  const stack = useStack();
  const { setOption } = useHeader();

  console.log("location", location);
  console.log("stack.all", stack.all);
  console.log("stack.trashs", stack.trashs);

  const childrenType = toString.call(children);
  const routes = React.useMemo(() => {
    return childrenType === "[object Array]" ? (children as any[]) : [children];
  }, [childrenType, children]);
  const stacks = React.useMemo(() => {
    return stack.all.concat(stack.trashs);
  }, [stack.all.length, stack.trashs.length]);

  React.useEffect(() => {
    const current = stack.current;
    const targetElement = (routes as React.ReactElement[]).find(
      (route) => route.props.path === current.path
    );
    current.noHeader = targetElement!.props.noHeader;

    setOption({
      title: targetElement!.props.title,
      useBackButton: stack.size > 1,
    });
  }, [stack.current.id]);

  console.log(
    `gestureData.isBack: ${gestureData.isBack}, gestureData.isForward: ${gestureData.isForward}`
  );

  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (gestureData.isBack) {
      timer = setTimeout(() => {
        gestureData.deltaX = 0;
        gestureData.gestureBack = false;
        console.log("init isBack");
      }, 100);
    }
    if (gestureData.isForward) {
      timer = setTimeout(() => {
        gestureData.deltaX = 0;
        gestureData.gestureForward = false;
        console.log("init isForward");
      }, 100);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [gestureData.isBack, gestureData.isForward]);

  return (
    <React.Fragment>
      <StackInfo>
        <p>
          current:
          {stack.all.map(({ level, path }) => `${level}:${path}`).join(", ")}
        </p>
        <p>
          trashs:
          {stack.trashs.map(({ level, path }) => `${level}:${path}`).join(", ")}
        </p>
      </StackInfo>
      <StackLayer stacks={stacks} routes={routes} />
    </React.Fragment>
  );
}

const StackInfo = styled.span`
  position: absolute;
  left: 0;
  bottom: 0;
  opacity: 0.6;
  padding: 4px;
  background: #444;
  color: white;
  z-index: 100;
`;

const StackLayer = React.memo(function ({
  stacks,
  routes,
}: {
  stacks: StackNode[];
  routes: any[];
}) {
  const stack = useStack();
  return (
    <>
      {stacks.map(({ id, level, path }) => {
        const targetElement = (routes as React.ReactElement[]).find(
          (route) => route?.props?.path === path
        );
        const Page = targetElement!.props.component;
        const noHeader = targetElement!.props.noHeader ?? false;
        const isFocusing = id === stack.current.id;

        return (
          <Stack
            stackId={id}
            key={id}
            level={level}
            isFocusing={isFocusing}
            path={path}
            isPopped={stack.trashs.some((trash) => trash.id === id)}
            noHeader={noHeader}
          >
            <Page />
          </Stack>
        );
      })}
    </>
  );
});
