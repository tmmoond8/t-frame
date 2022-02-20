import React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { animated, useSpring } from "@react-spring/web";
import { useDevLog } from "./DevLog";
import { useStack } from "../contexts/stackContext";

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

export default React.memo(function Stack({
  children,
  stackId,
  isFocusing = true,
  isPopped,
  path,
  level,
  skipAnimation = false,
}: Props) {
  const [animation, setAnimation] = React.useState<Record<string, any>>({});
  const [noAnimatedX, setNoAnimatedX] = React.useState<string | null>(null);
  const focusShadowValue = React.useRef(true);
  const stack = useStack();
  const { setLog } = useDevLog();
  // setLog("skip " + skipAnimation + " level " + level);

  React.useEffect(() => {
    if (skipAnimation) {
      setAnimation(fixed);
      setNoAnimatedX(null);
    } else {
      // setLog("ani");
      setAnimation(slideIn);
      setNoAnimatedX(null);
    }
  }, []);

  React.useEffect(() => {
    if (!isFocusing) {
      // setAnimation(fadeOut);
    }

    if (focusShadowValue.current === false && isFocusing) {
      // setAnimation(fadeIn);
    }
    focusShadowValue.current = isFocusing;
  }, [isFocusing, skipAnimation]);

  React.useEffect(() => {
    console.log("isPopped", isPopped);
    console.log("skipAnimation", skipAnimation);
    if (isPopped && skipAnimation) {
      setAnimation(slideOut);
      setNoAnimatedX("translateX(100%) !important");
    } else if (skipAnimation) {
      // setAnimation(flashIn);
      setAnimation(slideIn);
      setNoAnimatedX("translateX(0%) !important");
    } else if (isPopped) {
      console.log("isPopped", path);
      setAnimation(slideOut);
      setNoAnimatedX(null);
    }
  }, [isPopped, skipAnimation]);

  React.useEffect(() => {
    console.log(`focusing ${path} : ${isFocusing}, skip: ${skipAnimation}`);
  }, [isFocusing, skipAnimation]);

  React.useEffect(() => {
    if (skipAnimation) {
      setTimeout(() => {
        const targetStack = stack.findStack(stackId);
        if (targetStack) {
          targetStack.skipAnimation = false;
        }
      }, 1000);
    }
  }, [skipAnimation]);

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
