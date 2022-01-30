import styled from "@emotion/styled";
import { useHistory } from "../contexts/historyContext";
import { useStack } from "../contexts/stackContext";

export default function Header() {
  const { all } = useStack();

  return (
    <StyledHeader>
      <Link href="/" />
      <Link href="/feed" />
      <Link href="/about" />
      <button onClick={() => console.info(all)}>stack</button>
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
