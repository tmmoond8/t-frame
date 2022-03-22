import styled from "@emotion/styled";
import { IoMdHome, IoMdSearch, IoIosStar, IoMdPerson } from "react-icons/io";
import { Tabs, Tab } from "../../tab";
import Home from "./Home";
import Search from "./Search";
import Rate from "./Rate";
import MyWatcha from "./MyWatcha";

export default function HomePage() {
  return (
    <StyledTabs>
      <Tab name="홈" component={Home} icon={<IoMdHome size="22px" />} />
      <Tab name="검색" component={Search} icon={<IoMdSearch size="22px" />} />
      <Tab name="평가" component={Rate} icon={<IoIosStar size="22px" />} />
      <Tab
        name="나의 왓챠"
        component={MyWatcha}
        icon={<IoMdPerson size="22px" />}
      />
    </StyledTabs>
  );
}

const StyledTabs = styled(Tabs)`
  .TabButton {
    flex-direction: column;
  }
`;
