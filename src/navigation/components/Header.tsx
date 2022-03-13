import React from "react";
import styled from "@emotion/styled";
import { Box, Flex } from "@chakra-ui/react";
import { useHistory } from "../contexts/historyContext";
import { useStack } from "../contexts/stackContext";
import { useFocusEffect } from "../contexts/stackContext";

const HEADER_EVENTS = "T-FRAME-HEADER";

interface Props {
  screenOptions?: {
    headerStyle?: React.CSSProperties;
    headerTintColor?: string;
    headerTitleStyle?: React.CSSProperties;
  };
}

export default function Header({ screenOptions }: Props) {
  const {
    headerStyle = {},
    headerTintColor,
    headerTitleStyle = {},
  } = screenOptions ?? {};
  const [title, setTitle] = React.useState("");
  const [showBack, setShowBack] = React.useState(false);
  const [rightMenu, setRightMenu] = React.useState<React.ReactNode | null>(
    null
  );

  const stack = useStack();
  const titleStyle = { ...headerTitleStyle, color: headerTintColor ?? "black" };

  React.useEffect(() => {
    const eventHandler = (e: CustomEvent<any>) => {
      if (e.detail.title !== undefined) {
        setTitle(e.detail.title ?? "");
      }
      if (e.detail.useBackButton !== undefined) {
        setShowBack(e.detail.useBackButton ?? false);
      }
      if (e.detail.rightMenus !== undefined) {
        setRightMenu(e.detail.rightMenus);
      }
    };
    (window as any).addEventListener(HEADER_EVENTS, eventHandler);
    return () => {
      (window as any).removeEventListener(HEADER_EVENTS, eventHandler);
    };
  }, []);

  return (
    <>
      {!stack.current.noHeader && (
        <StyledHeader style={headerStyle}>
          <Box>
            <Link show={showBack} />
          </Box>
          <Title
            style={titleStyle}
            onClick={() => {
              console.info(stack.all.map(({ path }) => path));
              console.info(stack.current, stack.prev);
            }}
          >
            {title}
          </Title>
          <Flex justifyContent="flex-end">{rightMenu}</Flex>
        </StyledHeader>
      )}
    </>
  );
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 56px;
  width: 100%;
  background-color: white;
  padding: 16px;
  z-index: 100;
`;

const Title = styled.h1`
  color: black;
  font-size: 16px;
`;

function Link({ show }: { show: boolean }) {
  const { history } = useHistory();
  return (
    <Box
      as="button"
      visibility={show ? "visible" : "hidden"}
      fontSize="24px"
      fontWeight="800"
      onClick={() => history.pop()}
    >
      ←
    </Box>
  );
}

export function useHeader() {
  const setOption = (options: {
    title?: string;
    useBackButton?: boolean;
    rightMenus?: React.ReactNode;
  }) => {
    window.dispatchEvent(
      new CustomEvent(HEADER_EVENTS, {
        detail: options,
      })
    );
  };

  const useRightMenus = (renderRightMenus: React.FC) => {
    useFocusEffect(() => {
      setOption({
        rightMenus: renderRightMenus,
      });

      return () => {
        setOption({
          rightMenus: null,
        });
      };
    });
  };

  return {
    setOption,
    useRightMenus,
  };
}
