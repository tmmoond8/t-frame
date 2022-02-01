import React from "react";
import styled from "@emotion/styled";
import { useHistory } from "../contexts/historyContext";
import { useStack } from "../contexts/stackContext";

const HEADER_EVENTS = "T-FRAME-HEADER";

export default function Header() {
  const [title, setTitle] = React.useState("");
  const [showBack, setShowBack] = React.useState(false);
  const stack = useStack();

  console.log("header stack size", stack.size);

  React.useEffect(() => {
    const eventHandler = (e: CustomEvent<any>) => {
      setTitle(e.detail.title ?? "");
      setShowBack(e.detail.useBackButton ?? false);
    };
    (window as any).addEventListener(HEADER_EVENTS, eventHandler);
    return () => {
      (window as any).removeEventListener(HEADER_EVENTS, eventHandler);
    };
  }, []);

  return (
    <StyledHeader>
      <Link show={showBack} />
      <Title>{title}</Title>
      <button
        onClick={() => {
          console.info(stack.all.map(({ path }) => path));
          console.info(stack.current, stack.prev);
        }}
      >
        show stack
      </button>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  width: 100%;
  background-color: white;
`;

const Title = styled.h1`
  color: black;
  font-size: 16px;
`;

function Link({ show }: { show: boolean }) {
  const { history } = useHistory();
  return (
    <button
      style={{ visibility: show ? "visible" : "hidden" }}
      onClick={() => history.pop()}
    >
      ←
    </button>
  );
}

export function useHeader() {
  const setOption = ({
    title = "",
    useBackButton = false,
    rightMenu,
  }: {
    title?: string;
    useBackButton?: boolean;
    rightMenu?: React.ReactNode;
  }) => {
    window.dispatchEvent(
      new CustomEvent(HEADER_EVENTS, {
        detail: {
          title,
          useBackButton,
          rightMenu,
        },
      })
    );
  };

  return {
    setOption,
  };
}
