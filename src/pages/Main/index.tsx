import { Tabs, Tab } from "../../tab";
import Home from "./Home";
import Search from "./Search";
import Rate from "./Rate";
import MyWatcha from "./MyWatcha";

export default function HomePage() {
  return (
    <Tabs>
      <Tab name="홈" component={Home} />
      <Tab name="검색" component={Search}></Tab>
      <Tab name="평가" component={Rate}></Tab>
      <Tab name="나의 왓챠" component={MyWatcha}></Tab>
    </Tabs>
  );
}
