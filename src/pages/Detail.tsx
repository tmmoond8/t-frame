import React from "react";
import styled from "@emotion/styled";
import {} from "../navigation";

export default function DetailPage() {
  const [bottle, setBottle] = React.useState({} as any);

  React.useEffect(() => {
    if (window.history.state) {
      setBottle(window.history.state);
    }
  }, [window.history.state]);

  return (
    <>
      {bottle && (
        <Detail>
          <article>
            <div className="row">
              <img src={bottle!.photoURL} />
              <div className="summary">
                <h1>{`${bottle!.model} ${bottle!.submodel} ${bottle!.age}`}</h1>
                <p>{bottle!.price}원</p>
                <p>{bottle!.volume}</p>
              </div>
            </div>
            <div className="description">{bottle!.description}</div>
          </article>
        </Detail>
      )}
    </>
  );
}

const Detail = styled.div`
  padding: 16px 12px;
  article {
    .row {
      display: flex;
    }

    img {
      width: 40vw;
      height: auto;
    }
    .summary {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;

      h1 {
        font-size: 18px;
      }

      p {
        margin-top: 12px;
      }
    }
    .description {
      margin-top: 20px;
      line-height: 24px;
    }
  }
`;
