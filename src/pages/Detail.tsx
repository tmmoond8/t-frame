import React from "react";
import useSWR from "swr";
import {
  Box,
  Center,
  Container,
  Flex,
  Image,
  Stack,
  Text,
  HStack,
  List,
  ListItem,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { IoIosStar, IoIosAdd, IoIosEye } from "react-icons/io";
import { FaPencilAlt, FaEllipsisH } from "react-icons/fa";
import { BsFillShareFill } from "react-icons/bs";
import Layout from "../components/Layout";
import { useHeader } from "../navigation";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function DetailPage() {
  const { useRightMenus } = useHeader();
  const { data } = useSWR<Detail>("/api/getDetail.json", fetcher);
  useRightMenus(() => <BsFillShareFill size="18px" />);
  const { film, casts } = data ?? {};

  return (
    <Layout.Page p="0 !important">
      {film && (
        <Container p="16px" overflowX="hidden" overflowY="auto">
          <Box>
            <Flex>
              <Image src={film.poster_url} w="20vw" h="auto" />
              <Stack ml="20px">
                <Text mt="20px">Reservation Ranking</Text>
                <Text fontSize="24px" fontWeight={800} mt="12px !important">
                  {film.korean_title}
                </Text>
                <Text>
                  {`${film.year} ・ ${film.genres
                    .map(({ name }) => name)
                    .join("/")} ・ ${film.countries
                    .map(({ name }) => name)
                    .join("/")}`}
                </Text>
              </Stack>
            </Flex>
          </Box>
          <Box>
            <Flex borderBottom="1px solid #ddd" py="10px">
              <Text color="rgb(255, 47, 110)">Exp ★4.1</Text>
              <Text ml="12px">Average ★3.9 (64k)</Text>
            </Flex>
            <Center flexDir="column" py="20px" borderBottom="1px solid #ddd">
              <Text>Rate</Text>
              <HStack>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <IoIosStar key={idx} size={44} color="#eee" />
                ))}
              </HStack>
            </Center>
            <HStack>
              <Center flexDir="column" flex={1} py="12px">
                <IoIosAdd size={32} />
                <Text>WatchList</Text>
              </Center>
              <Center flexDir="column" flex={1}>
                <FaPencilAlt size={20} />
                <Text>Comment</Text>
              </Center>
              <Center flexDir="column" flex={1}>
                <IoIosEye size={30} />
                <Text>Watching</Text>
              </Center>
              <Center flexDir="column" flex={1}>
                <FaEllipsisH size={32} />
                <Text>More</Text>
              </Center>
            </HStack>
          </Box>
          <Box mt="16px">
            <Text fontSize="xl" fontWeight="800">
              출연/제작
            </Text>
            <Grid
              as="ol"
              mt="22px"
              overflowX="auto"
              overflowY="hidden"
              mx="-16px"
              css={{
                grid: "repeat(3, 76px) / auto-flow 93%",
              }}
            >
              {casts &&
                casts.map(({ id, name, role, face_url }) => (
                  <GridItem as="li" key={id} display="flex" w="100%" pl="16px">
                    <Image
                      src={face_url}
                      w="56px"
                      h="56px"
                      borderRadius="6px"
                    />
                    <Box ml="16px" flex="1" borderBottom="1px solid #eee">
                      <Text fontWeight="600">{name}</Text>
                      <Text color="#777">{role}</Text>
                    </Box>
                  </GridItem>
                ))}
            </Grid>
          </Box>
          <Box h="100px" />
        </Container>
      )}
    </Layout.Page>
  );
}

interface Detail {
  film: {
    id: number;
    korean_title: string;
    original_title: string;
    year: number;
    running_time_hour: number;
    running_time_minute: number;
    description: string;
    poster_url: string;
    avg_rating: string;
    countries: [
      {
        id: number;
        name: string;
      }
    ];
    genres: {
      id: number;
      name: string;
    }[];
    service_providers: {
      id: number;
      name: string;
    }[];
  };
  urls: {
    id: number;
    film_url_type: string;
    film_url: string;
  }[];
  casts: {
    id: number;
    name: string;
    role: string;
    face_url: string;
  }[];
  collections: {
    id: number;
    name: string;
    user: {
      id: number;
      name: string;
      face_image_url: null | string;
    };
    poster_urls: string[];
  }[];
  reviews: {
    id: number;
    review_type: string;
    comment: string;
    like_count: number;
    score: string;
    user: {
      id: number;
      name: string;
      face_image_url: null | string;
    };
  }[];
  score_counts: {
    score: string;
    total: number;
  }[];
  authenticated_user_review: {
    id: number;
    review_type: string;
    comment: string;
    like_count: number;
    score: string;
    user: {
      id: number;
      name: string;
      face_image_url: null | string;
    };
  };
}
