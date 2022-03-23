import {
  Box,
  Text,
  Center,
  List,
  ListItem,
  Image,
  Stack,
  HStack,
} from "@chakra-ui/react";
import useSWR from "swr";
import { IoIosStar, IoIosMore } from "react-icons/io";
import Layout from "../../components/Layout";
const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Rate() {
  const { data: moviesData } = useSWR<{
    movies: {
      code: string;
      title: string;
      year: number;
      poster: {
        medium: string;
      };
      nations: {
        name: string;
      }[];
    }[];
  }>("/api/getMovies.json", fetcher);
  return (
    <Layout.Page>
      <Center flexDir="column">
        <Text fontWeight="800" fontSize="2xl">
          0
        </Text>
        <Text color="#666" mt="4px">
          보셨던 영화를 평가해주세요.
        </Text>
      </Center>
      <List
        position="relative"
        mt="16px"
        borderTop="1px solid #eee"
        borderBottom="1px solid #eee"
      >
        {moviesData?.movies?.map((movie) => (
          <ListItem display="flex" p="16px 24px" key={movie.code}>
            <Image
              src={movie.poster.medium}
              w="20vw"
              h="auto"
              objectFit="cover"
            />
            <Stack ml="16px">
              <Text fontSize="lg" fontWeight="600">
                {movie.title}
              </Text>
              <Text mt="0 !important" fontSize="sm" color="#666">
                {`${movie.year} ・ ${movie.nations[0].name}`}
              </Text>
              <HStack
                mt="20px !important"
                css={{
                  svg: {
                    marginLeft: "0 !important",
                  },
                }}
              >
                {Array.from({ length: 5 }).map((_, idx) => (
                  <IoIosStar key={idx} size={44} color="#eee" />
                ))}
              </HStack>
            </Stack>
            <Box
              position="absolute"
              top="12px"
              right="24px"
              transform="rotate(90deg)"
            >
              <IoIosMore color="#999" size="20px" />
            </Box>
          </ListItem>
        ))}
      </List>
    </Layout.Page>
  );
}
