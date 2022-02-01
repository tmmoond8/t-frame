import { useHistory } from "../navigation";

export default function FeedPage() {
  const { history } = useHistory();
  return (
    <div>
      FeedPage
      <button onClick={() => history.pop()}>Go Back</button>
    </div>
  );
}
