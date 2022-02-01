import styled from "@emotion/styled";
import { useHistory } from "../contexts/historyContext";
import { useStack } from "../contexts/stackContext";

interface Props {
  title: string;
}

export default function Header({ title }: Props) {
  const stack = useStack();
  console.log("stack size", stack.size);

  return (
    <StyledHeader>
      <Link />
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

function Link() {
  const { history } = useHistory();
  return <button onClick={() => history.pop()}>←</button>;
}
