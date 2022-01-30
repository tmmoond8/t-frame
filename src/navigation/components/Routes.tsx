import React from "react";
import styled from "@emotion/styled";
import { animated, useSpring } from "@react-spring/web";
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

  console.log("---", stack);

  const childrenType = toString.call(children);
  const routes =
    childrenType === "[object Array]" ? (children as any[]) : [children];

  return (
    <React.Fragment>
      {stack.all.map(({ id, screenName }) => {
        const targetElement = (routes as React.ReactElement[]).find(
          (route) => route.props.path === screenName
        );
        const Page = targetElement!.props.component;

        const isFocusing = id === stack.current.id;

        return (
          <Stack key={id} isFocusing={isFocusing}>
            <Page />
          </Stack>
        );
      })}
    </React.Fragment>
  );
}
