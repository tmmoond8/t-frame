import React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { animated, useSpring } from "@react-spring/web";
import { useDevLog } from "./DevLog";

interface Props {
  children: React.ReactNode;
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

// const fadeIn = {
//   from: {
//     filter: "brightness(0.9)",
//   },
//   to: {
//     filter: "brightness(1)",
//   },
// };
// const fadeOut = {
//   from: {
//     filter: "brightness(1)",
//   },
//   to: {
//     filter: "brightness(0.9)",
//   },
// };

const flashOut = {
  from: {
    transform: "translateX(10000%)",
  },
  to: {
    transform: "translateX(100000%)",
  },
};

const flashIn = {
  from: {
    transform: "translateX(0%)",
  },
  to: {
    transform: "translateX(0%)",
  },
};

export default React.memo(function Stack({
  children,
  isFocusing = true,
  isPopped,
  path,
  level,
  skipAnimation = false,
}: Props) {
  const [animation, setAnimation] = React.useState<Record<string, any>>({});
  const [noAnimatedX, setNoAnimatedX] = React.useState<string | null>(null);
  const focusShadowValue = React.useRef(true);
  const { setLog } = useDevLog();
  // setLog("skip " + skipAnimation + " level " + level);

  React.useEffect(() => {
    if (level === 0 || skipAnimation) {
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
