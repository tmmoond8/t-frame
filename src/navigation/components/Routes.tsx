import React from "react";
import { useRouterContext } from "..";
import { useStack } from "../contexts/stackContext";
import Stack from "./Stack";

interface Props {
  children: React.ReactElement | React.ReactElement[];
}

export default function Routes({ children }: Props) {
  const { location } = useRouterContext();
  const stack = useStack();

  console.log("location", location);
  console.log("current", stack.current);
  console.log("prev", stack.prev);

  console.log("---", stack.trashs);

  const childrenType = toString.call(children);
  const routes =
    childrenType === "[object Array]" ? (children as any[]) : [children];

  return (
    <React.Fragment>
      {stack.all.concat(stack.trashs).map(({ id, level, screenName }) => {
        const targetElement = (routes as React.ReactElement[]).find(
          (route) => route.props.path === screenName
        );
        const Page = targetElement!.props.component;
        const isFocusing = level === stack.current.level;

        return (
          <Stack
            key={id}
            level={level}
            isFocusing={isFocusing}
            screenName={screenName}
            isPopped={stack.trashs.some((trash) => trash.id === id)}
          >
            <Page />
          </Stack>
        );
      })}
    </React.Fragment>
  );
}
