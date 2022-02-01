import { useHistory } from "../navigation";

export default function HomePage() {
  const { history } = useHistory();
  return (
    <div>
      HomePage
      <button onClick={() => history.push("/feed")}>Go Feed</button>
      <button onClick={() => history.push("/about")}>Go About</button>
    </div>
  );
}
