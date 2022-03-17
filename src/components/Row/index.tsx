import { Box, Text, HStack, Image } from "@chakra-ui/react";
import { useHistory } from "../../navigation";

interface Props {
  title: string;
  data?: {
    id: number;
    name: string;
    poster_url?: string;
  }[];
}

export default function Row({ title, data = [] }: Props) {
  const { history } = useHistory();
  return (
    <Box>
      <Text fontSize={22} fontWeight={700}>
        {title}
      </Text>
      <HStack overflowY="hidden" overflowX="auto" as="ol">
        {data.map(({ id, name, poster_url }) => (
          <Box
            key={id}
            as="li"
            minW="min(25vw, 200px)"
            cursor="pointer"
            onClick={() => {
              history.push("/detail");
            }}
          >
            <Image src={poster_url} w="100%" h="auto" borderRadius="6px" />
            <Text
              fontSize={14}
              h="50px"
              py="4px"
              display="-webkit-box"
              style={{
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {name}
            </Text>
          </Box>
        ))}
      </HStack>
    </Box>
  );
}
