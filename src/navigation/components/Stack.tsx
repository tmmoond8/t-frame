import React from "react";
import styled from "@emotion/styled";
import { animated, useSpring } from "@react-spring/web";

interface Props {
  children: React.ReactNode;
  isFocusing?: boolean;
  path: string;
  isPopped: boolean;
  level: number;
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

const fadeIn = {
  from: {
    filter: "brightness(0.7)",
  },
  to: {
    filter: "brightness(1)",
  },
};
const fadeOut = {
  from: {
    filter: "brightness(1)",
  },
  to: {
    filter: "brightness(0.7)",
  },
};

export default React.memo(function Stack({
  children,
  isFocusing = true,
  isPopped,
  path,
  level,
}: Props) {
  const [animation, setAnimation] = React.useState<Record<string, any>>({});
  const focusShadowValue = React.useRef(true);

  React.useEffect(() => {
    if (level === 0) {
      setAnimation(fixed);
    } else {
      setAnimation(slideIn);
    }
  }, []);

  React.useEffect(() => {
    if (!isFocusing) {
      setAnimation(fadeOut);
    }
    if (focusShadowValue.current === false && isFocusing) {
      setAnimation(fadeIn);
    }
    focusShadowValue.current = isFocusing;
  }, [isFocusing]);

  React.useEffect(() => {
    if (isPopped) {
      console.log("isPopped", path);
      setAnimation(slideOut);
    }
  }, [isPopped]);

  const animationStyle = useSpring(animation);

  return (
    <Animated style={animationStyle} level={level}>
      {children}
      <PageInfo>
        {level}: {path}
      </PageInfo>
    </Animated>
  );
});

const Animated = styled(animated.div)<{ level: number }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transform: translateX(100%);
  background-color: white;
  z-index: ${(p) => p.level};
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
