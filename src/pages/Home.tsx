import React from "react";
import { Text, HStack, Box, Image } from "@chakra-ui/react";
import styled from "@emotion/styled";
import useSWR from "swr";
import { useHistory } from "../navigation";
import Layout from "../components/Layout";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function HomePage() {
  const { history } = useHistory();
  const { data } = useSWR<{
    collections: {
      id: number;
      name: string;
      poster_urls: string[];
    }[];
  }>("/api/getCollections.json", fetcher);

  return (
    <Layout.Page px="16px">
      <Text fontSize={22} fontWeight={700}>
        Box Office
      </Text>
      <HStack overflowX="auto" as="ol" mt="12px">
        {data?.collections.map(({ id, name, poster_urls }) => (
          <Box
            key={id}
            as="li"
            minW="min(25vw, 200px)"
            cursor="pointer"
            onClick={() => {
              history.push("/detail");
            }}
          >
            <Image src={poster_urls[0]} w="100%" h="auto" borderRadius="6px" />
            <Text fontSize={14} py="4px">
              {name}
            </Text>
          </Box>
        ))}
      </HStack>
    </Layout.Page>
  );
}

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
