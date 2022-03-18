import { Spacer, Box } from "@chakra-ui/react";
import useSWR from "swr";
import Row from "../../components/Row";
import Layout from "../../components/Layout";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Home() {
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
  const { data: awardData } = useSWR<{
    awards: {
      staffmade_id: number;
      title: string;
      posters: string[];
    }[];
  }>("/api/getAwards.json", fetcher);

  return (
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
      <Spacer maxH="24px" />
      <Row
        title="수상작"
        data={awardData?.awards.map((award) => ({
          id: award.staffmade_id,
          name: award.title,
          poster_url: award.posters[0],
        }))}
      />
      <Box minH="44px" />
    </Layout.Page>
  );
}
