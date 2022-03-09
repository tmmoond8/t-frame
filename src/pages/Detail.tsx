import React from "react";
import styled from "@emotion/styled";
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

  return (
    <Layout.Page px="16px">
      {data && (
        <Container py="16px">
          <Box>
            <Flex>
              <Image src={data.film.poster_url} w="20vw" h="auto" />
              <Stack ml="20px">
                <Text mt="20px">Reservation Ranking</Text>
                <Text fontSize="24px" fontWeight={800} mt="12px !important">
                  {data.film.korean_title}
                </Text>
                <Text>
                  {`${data.film.year} ・ ${data.film.genres
                    .map(({ name }) => name)
                    .join("/")} ・ ${data.film.countries
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
                {Array.from({ length: 5 }).map(() => (
                  <IoIosStar size={44} color="#eee" />
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
        </Container>
      )}
    </Layout.Page>
  );
}

const Detail = styled.div`
  padding: 16px 12px;
  article {
    .row {
      display: flex;
    }

    img {
      width: 40vw;
      height: auto;
    }
    .summary {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;

      h1 {
        font-size: 18px;
      }

      p {
        margin-top: 12px;
      }
    }
    .description {
      margin-top: 20px;
      line-height: 24px;
    }
  }
`;

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
