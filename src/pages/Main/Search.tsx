import { Text, Input, Button, Flex, List, ListItem } from "@chakra-ui/react";
import Layout from "../../components/Layout";

export default function Search() {
  const popularList = [
    "벨파스트",
    "뜨거운 피",
    "드라이브 마이 카",
    "코다",
    "69세",
  ];
  return (
    <Layout.Page px="16px">
      <Flex>
        <Input />
        <Button ml="16px" colorScheme="pink">
          Search
        </Button>
      </Flex>
      <Text fontSize={22} fontWeight={700} my="12px">
        인기 검색어
      </Text>
      <List>
        {popularList.map((item) => (
          <ListItem
            key={item}
            fontSize="16px"
            fontWeight="600"
            p="12px 0"
            boxShadow="0 1px #eee"
          >
            {item}
          </ListItem>
        ))}
      </List>
    </Layout.Page>
  );
}
