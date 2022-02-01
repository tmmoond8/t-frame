import React from "react";
import { useRouterContext } from "..";
import { useStack } from "../contexts/stackContext";
import Stack from "./Stack";
import { useHeader } from "./Header";

interface Props {
  children: React.ReactElement | React.ReactElement[];
}

export default function Routes({ children }: Props) {
  const { location } = useRouterContext();
  const stack = useStack();
  const { setOption } = useHeader();

  console.log("location", location);
  console.log("current", stack.current);
  console.log("prev", stack.prev);

  console.log("---", stack.trashs);

  const childrenType = toString.call(children);
  const routes =
    childrenType === "[object Array]" ? (children as any[]) : [children];

  React.useEffect(() => {
    const current = stack.current;
    const targetElement = (routes as React.ReactElement[]).find(
      (route) => route.props.path === current.path
    );

    setOption({
      title: targetElement!.props.title,
      useBackButton: stack.size > 1,
      rightMenu: targetElement!.props.rightMenu,
    });
  }, [stack.current.id]);

  return (
    <React.Fragment>
      {stack.all.concat(stack.trashs).map(({ id, level, path }) => {
        const targetElement = (routes as React.ReactElement[]).find(
          (route) => route.props.path === path
        );
        const Page = targetElement!.props.component;
        const isFocusing = level === stack.current.level;

        return (
          <Stack
            key={id}
            level={level}
            isFocusing={isFocusing}
            path={path}
            isPopped={stack.trashs.some((trash) => trash.id === id)}
          >
            <Page />
          </Stack>
        );
      })}
    </React.Fragment>
  );
}
