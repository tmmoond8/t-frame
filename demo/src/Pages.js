import { Tabs, Tab, useHistory } from "t-frame";

export default {
  Main,
  Detail,
  Editor,
  Person,
};

function Main() {
  return (
    <Tabs>
      <Tab name="홈" component={Home} />
      <Tab name="검색" component={Search} />
      <Tab name="평가" component={Rate} />
      <Tab name="나의 왓챠" component={MyWatcha} />
    </Tabs>
  );
}

function Home() {
  const { history } = useHistory();

  return (
    <div
      style={{
        background: "#040",
      }}
    >
      <ol>
        {Array.from({ length: 10 }).map(() => (
          <li
            onClick={() => {
              history.push("/detail");
            }}
          >
            Home
          </li>
        ))}
      </ol>
    </div>
  );
}

function Search() {
  const { history } = useHistory();
  return (
    <div
      style={{
        background: "#040",
      }}
    >
      <ol>
        {Array.from({ length: 10 }).map(() => (
          <li
            onClick={() => {
              history.push("/editor");
            }}
          >
            Search
          </li>
        ))}
      </ol>
    </div>
  );
}

function Rate() {
  return (
    <div
      style={{
        background: "#040",
      }}
    >
      <ol>
        {Array.from({ length: 10 }).map(() => (
          <li>Rate</li>
        ))}
      </ol>
    </div>
  );
}

function MyWatcha() {
  return (
    <div
      style={{
        background: "#040",
      }}
    >
      <ol>
        {Array.from({ length: 10 }).map(() => (
          <li>MyWatcha</li>
        ))}
      </ol>
    </div>
  );
}
function Detail() {
  return (
    <div
      style={{
        background: "#040",
      }}
    >
      <ol>
        {Array.from({ length: 10 }).map(() => (
          <li>Detail</li>
        ))}
      </ol>
    </div>
  );
}

function Editor() {
  return (
    <div
      style={{
        background: "#040",
      }}
    >
      <ol>
        {Array.from({ length: 10 }).map(() => (
          <li>Editor</li>
        ))}
      </ol>
    </div>
  );
}

function Person() {
  return (
    <div
      style={{
        background: "#040",
      }}
    >
      <ol>
        {Array.from({ length: 10 }).map(() => (
          <li>Person</li>
        ))}
      </ol>
    </div>
  );
}
