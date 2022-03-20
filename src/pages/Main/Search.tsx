import { Text, Input, Button, Flex } from "@chakra-ui/react";
import Layout from "../../components/Layout";

export default function Search() {
  return (
    <Layout.Page px="16px">
      <Text fontSize={22} fontWeight={700}>
        Search
      </Text>
      <Flex>
        <Input />
        <Button>Search</Button>
      </Flex>
    </Layout.Page>
  );
}
