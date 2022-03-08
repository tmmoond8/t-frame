import React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { animated, useSpring } from "@react-spring/web";
import { useRouterContext } from "..";

interface Props {
  children: React.ReactNode;
  stackId: string;
  isFocusing?: boolean;
  path: string;
  isPopped: boolean;
  level: number;
  skipAnimation?: boolean;
}

const fixed = {
  from: {
    transform: "translateX(0%)",
  },
  to: {
    transform: "translateX(0%)",
  },
};

const slideIn = {
  from: {
    transform: "translateX(100%)",
  },
  to: {
    transform: "translateX(0%)",
    opacity: 1,
  },
};

const slideOut = {
  from: {
    transform: "translateX(0%)",
  },
  to: {
    transform: "translateX(100%)",
  },
};

const fadeIn = {
  from: {
    transform: "translateX(-20%)",
    opacity: 0.6,
  },
  to: {
    transform: "translateX(0%)",
    opacity: 1,
  },
};

const fadeOut = {
  from: {
    transform: "translateX(0%)",
    opacity: 1,
  },
  to: {
    transform: "translateX(-20%)",
    opacity: 0.6,
  },
};
export default React.memo(function Stack({
  children,
  stackId,
  isFocusing = true,
  isPopped,
  path,
  level,
}: Props) {
  const [animation, setAnimation] = React.useState<Record<string, any>>({});
  const [noAnimatedX, setNoAnimatedX] = React.useState<string | null>(null);
  const focusShadowValue = React.useRef(true);
  const { gestureData } = useRouterContext();
  console.log(
    `= path: ${path}, isFocusing: ${isFocusing}, isPopped: ${isPopped}, level: ${level}, stackId: ${stackId} children: ${children}`
  );
  const skipAnimation = gestureData.isBack || gestureData.isForward;
  console.log("path skipAnimation", skipAnimation);

  React.useEffect(() => {
    if (skipAnimation) {
      setAnimation(fixed);
      setNoAnimatedX(null);
    } else {
      setAnimation(slideIn);
      setNoAnimatedX(null);
    }
  }, []);

  React.useEffect(() => {
    const focus = focusShadowValue.current;
    focusShadowValue.current = isFocusing;
    console.log("skipAnimation", skipAnimation);
    if (skipAnimation && isPopped) {
      console.log(`** ${path}: 1`);
      setAnimation(slideOut);
      setNoAnimatedX("translateX(100%) !important");
      return;
    }
    if (isPopped) {
      console.log(`** ${path}: 2`);
      console.log("isPopped", path);
      setAnimation(slideOut);
      setNoAnimatedX(null);
      return;
    }
    if (skipAnimation && !isFocusing) {
      console.log(`** ${path}: 3`);
      setAnimation(slideOut);
      setNoAnimatedX("translateX(100%) !important");
      return;
    }
    if (skipAnimation && isFocusing) {
      console.log(`** ${path}: 4`);
      setAnimation(slideIn);
      setNoAnimatedX("translateX(0%) !important");
      return;
    }
    if (!isFocusing) {
      console.log(`** ${path}: 5`);
      setNoAnimatedX(null);
      return setAnimation(fadeOut);
    }

    if (focus === false && isFocusing) {
      console.log(`** ${path}: 6`);
      setNoAnimatedX(null);
      return setAnimation(fadeIn);
    }
  }, [isFocusing, isPopped, skipAnimation]);

  React.useEffect(() => {
    console.log(`focusing ${path} : ${isFocusing}, skip: ${skipAnimation}`);
  }, [isFocusing, skipAnimation]);

  const animationStyle = useSpring(animation);

  return (
    <Animated style={animationStyle} level={level} noAnimatedX={noAnimatedX}>
      {children}
      <PageInfo>
        {level}: {path}
      </PageInfo>
    </Animated>
  );
});

const Animated = styled(animated.div)<{
  level: number;
  noAnimatedX: string | null;
}>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transform: translateX(100%);
  background-color: white;
  z-index: ${(p) => p.level};
  ${(p) =>
    p.noAnimatedX &&
    css`
      transform: ${p.noAnimatedX};
    `}
`;

const PageInfo = styled.span`
  position: absolute;
  right: 0;
  bottom: 0;
  opacity: 0.6;
  padding: 4px;
  background: #444;
  color: white;
`;
