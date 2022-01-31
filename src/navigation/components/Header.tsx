import styled from "@emotion/styled";
import { useHistory } from "../contexts/historyContext";
import { useStack } from "../contexts/stackContext";

export default function Header() {
  const stack = useStack();

  return (
    <StyledHeader>
      <Link href="/" />
      <Link href="/feed" />
      <Link href="/about" />
      <button
        onClick={() => {
          console.info(stack.all.map(({ screenName }) => screenName));
          console.info(stack.current, stack.prev);
        }}
      >
        show stack
      </button>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  height: 56px;
  width: 100%;
`;

function Link({ href }: { href: string }) {
  const { history } = useHistory();
  return <button onClick={() => history.push(href)}>{href}</button>;
}
