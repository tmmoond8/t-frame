import {
  Box,
  Flex,
  Image,
  Text,
  List,
  ListItem,
  Container,
  Stack,
} from "@chakra-ui/react";
import useSWR from "swr";
import { useHistory } from "../navigation";
import Layout from "../components/Layout";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function PersonPage() {
  const { data: collectionData } = useSWR<{
    collections: {
      id: number;
      name: string;
      poster_urls: string[];
    }[];
  }>("/api/getCollections.json", fetcher);
  const { history } = useHistory();
  return (
    <Layout.Page p="0 !important">
      <Container p="20px 16px" overflowY="auto" overflowX="hidden">
        <Flex>
          <Image
            src="https://an2-img.amz.wtchn.net/image/v2/DTqtAPMfegq0IkuARH4h1g.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk1qUXdlREkwTUNKZExDSndJam9pTDNZeEwzQmxiM0JzWlM5dFpXUnBkVzB2TURrMU1XVmlObVZpWW1RME16STVOMkkwWm1VdWFuQm5JbjAuTFZqQk4tcFhPUGUyNDJqUU8zczUxTWhKcVVyWkpwR2dBVXI0dVR0c0NoUQ"
            w="198px"
            h="198px"
            borderRadius="6px"
          />
          <Box ml="32px" flex="1">
            <Text fontSize="32px" fontWeight="600">
              라이언 고슬링
            </Text>
            <Text fontSize="24px" color="#777">
              배우
            </Text>
          </Box>
        </Flex>
        <List
          mt="60px"
          borderTop="1px solid #eee"
          borderBottom="1px solid #eee"
        >
          {collectionData?.collections?.map((collection) => (
            <ListItem
              display="flex"
              p="16px 24px"
              key={collection.id}
              cursor="pointer"
              onClick={() => {
                history.push("/detail");
              }}
            >
              <Image
                src={collection.poster_urls[0]}
                w="20vw"
                h="auto"
                objectFit="cover"
              />
              <Stack ml="16px">
                <Text fontSize="lg" fontWeight="600">
                  {collection.name}
                </Text>
              </Stack>
            </ListItem>
          ))}
        </List>
      </Container>
    </Layout.Page>
  );
}
