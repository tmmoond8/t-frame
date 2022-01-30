import React from "react";
import styled from "@emotion/styled";
import { animated, useSpring } from "@react-spring/web";

interface Props {
  children: React.ReactNode;
  isFocusing?: boolean;
  key: number;
}

const slideIn = {
  from: {
    transform: "translateX(100%)",
  },
  to: {
    transform: "translateX(0)",
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
  key,
}: Props) {
  const [animation, setAnimation] = React.useState<Record<string, any>>({});
  console.log("isFocusing", key, isFocusing);

  React.useEffect(() => {
    setAnimation(slideIn);
  }, []);

  React.useEffect(() => {
    if (!isFocusing) {
      setAnimation(fadeOut);
    }
  }, [isFocusing]);

  const animationStyle = useSpring(animation);

  return <Animated style={animationStyle}>{children}</Animated>;
});

const Animated = styled(animated.div)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transform: translateX(100%);
  background-color: white;
`;
