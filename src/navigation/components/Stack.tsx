import React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { UseSpringProps, animated, useSpring } from "@react-spring/web";
import { useRouterContext } from "..";
import { useUiContext } from "../contexts/uiContext";
import animations from "../modules/animations";

interface Props {
  children: React.ReactNode;
  stackId: string;
  isFocusing?: boolean;
  path: string;
  isPopped: boolean;
  level: number;
  skipAnimation?: boolean;
  noHeader: boolean;
}

export default React.memo(function Stack({
  children,
  stackId,
  isFocusing = true,
  isPopped,
  noHeader,
  path,
  level,
}: Props) {
  const [animation, setAnimation] = React.useState<UseSpringProps>({}!);
  const [noAnimatedX, setNoAnimatedX] = React.useState<string | null>(null);
  const focusShadowValue = React.useRef(true);
  const { gestureData } = useRouterContext();
  const { pratform } = useUiContext();
  const [hidden, setHidden] = React.useState(true);
  console.log("pratform", pratform);
  const pratformAnimation = animations[pratform];
  console.log(
    `= path: ${path}, isFocusing: ${isFocusing}, isPopped: ${isPopped}, level: ${level}, stackId: ${stackId} children: ${children}`
  );
  const skipAnimation = gestureData.isBack || gestureData.isForward;

  React.useEffect(() => {
    if (skipAnimation) {
      setAnimation(pratformAnimation.fixed);
      setNoAnimatedX(null);
    } else {
      setAnimation(pratformAnimation.slideIn);
      setNoAnimatedX(null);
    }
  }, []);

  React.useEffect(() => {
    const focus = focusShadowValue.current;
    focusShadowValue.current = isFocusing;
    console.log("skipAnimation", skipAnimation);
    if (skipAnimation && isPopped) {
      console.log(`** ${path}: 1`);
      setAnimation(pratformAnimation.slideOut);
      setNoAnimatedX("translateX(100%) !important");
      return;
    }
    if (isPopped) {
      console.log(`** ${path}: 2`);
      console.log("isPopped", path);
      setAnimation(pratformAnimation.slideOut);
      setNoAnimatedX(null);
      return;
    }
    if (skipAnimation && !isFocusing) {
      console.log(`** ${path}: 3`);
      setAnimation(pratformAnimation.slideOut);
      setNoAnimatedX("translateX(100%) !important");
      return;
    }
    if (skipAnimation && isFocusing) {
      console.log(`** ${path}: 4`);
      setAnimation(pratformAnimation.slideIn);
      setNoAnimatedX("translateX(0%) !important");
      return;
    }
    if (!isFocusing) {
      console.log(`** ${path}: 5`);
      setNoAnimatedX(null);
      return setAnimation(pratformAnimation.fadeOut);
    }

    if (focus === false && isFocusing) {
      console.log(`** ${path}: 6`);
      setNoAnimatedX(null);
      return setAnimation(pratformAnimation.fadeIn);
    }
  }, [isFocusing, isPopped, skipAnimation]);

  React.useEffect(() => {
    console.log(`focusing ${path} : ${isFocusing}, skip: ${skipAnimation}`);
  }, [isFocusing, skipAnimation]);

  React.useEffect(() => {
    if (!isFocusing) {
      setTimeout(() => {
        setHidden(true);
      }, pratformAnimation.config.duration);
    } else {
      setHidden(false);
    }
  }, [isFocusing]);

  const animationStyle = useSpring({
    ...animation,
    config: pratformAnimation.config,
  });

  return (
    <Animated
      style={animationStyle}
      level={hidden ? -1 : level}
      noAnimatedX={noAnimatedX}
      noHeader={noHeader}
    >
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
  noHeader: boolean;
}>`
  position: absolute;
  top: ${(p) => (p.noHeader ? "0" : "56px")};
  left: 0;
  width: 100%;
  height: ${(p) => (p.noHeader ? "100%" : "calc(100% - 56px)")};
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
