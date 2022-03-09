import React from "react";
import styled from "@emotion/styled";
import { useHistory, useHeader } from "../navigation";

export default function HomePage() {
  const { history } = useHistory();
  const { useRightMenus } = useHeader();
  useRightMenus(() => (
    <button onClick={() => history.push("/editor")}>✏️</button>
  ));

  const { data } = useFetch();
  return (
    <List>
      {data.map((bottle) => (
        <Item key={bottle.id}>
          <article
            onClick={() => {
              history.push("/detail", {
                state: bottle,
              });
            }}
          >
            <img src={bottle.photoURL} />
            <div className="summary">
              <h2>{`${bottle.model} ${bottle.submodel} ${bottle.age}`}</h2>
              <p>{bottle.price}원</p>
              <p>{bottle.volume}</p>
            </div>
          </article>
        </Item>
      ))}
    </List>
  );
}

const List = styled.ol`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Item = styled.li`
  padding: 16px 12px;
  article {
    display: flex;
    cursor: pointer;

    img {
      width: 100px;
      height: auto;
    }
    .summary {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;

      h2 {
        font-size: 18px;
      }

      p {
        margin-top: 12px;
      }
    }
  }
`;

function useFetch() {
  const [data, setData] = React.useState<
    {
      id: number;
      category: string;
      model: string;
      submodel: string;
      age: string;
      description: string;
      price: number;
      volume: string;
      date: string;
      photoURL: string;
      where: string;
      etc: string;
    }[]
  >([]);

  React.useEffect(() => {
    fetch("/getData.json")
      .then((r) => r.json())
      .then(({ ok, data }) => {
        if (ok) {
          setData(data);
        }
      });
  }, []);

  return {
    data,
  };
}
