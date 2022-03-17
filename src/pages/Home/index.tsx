import React from "react";
import { Text, Spacer } from "@chakra-ui/react";
import useSWR from "swr";
import { Tabs, Tab } from "../../tab";
import Row from "../../components/Row";
import Layout from "../../components/Layout";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function HomePage() {
  const { data: collectionData } = useSWR<{
    collections: {
      id: number;
      name: string;
      poster_urls: string[];
    }[];
  }>("/api/getCollections.json", fetcher);
  const { data: rankingData } = useSWR<{
    rankings: {
      chart_rank: number;
      content: {
        code: string;
        title: string;
        poster: {
          medium: string;
        };
      };
    }[];
  }>("/api/getRankings.json", fetcher);

  return (
    <Tabs>
      <Tab name="홈">
        <Layout.Page px="16px">
          <Row
            title="Box Offie"
            data={collectionData?.collections.map((collection) => ({
              ...collection,
              poster_url: collection.poster_urls[0],
            }))}
          />
          <Spacer maxH="24px" />
          <Row
            title="추천 랭킹"
            data={rankingData?.rankings.map((ranking) => ({
              id: Number(
                ranking.content.code.split("").reduce((acc, c) => {
                  acc += c.charCodeAt(0);
                  return acc;
                }, "")
              ),
              name: ranking.content.title,
              poster_url: ranking.content.poster.medium,
            }))}
          />
        </Layout.Page>
      </Tab>
      <Tab name="검색">
        <Layout.Page px="16px">
          <Text fontSize={22} fontWeight={700}>
            Search
          </Text>
        </Layout.Page>
      </Tab>
    </Tabs>
  );
}
