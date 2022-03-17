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
      <HStack overflowX="auto" as="ol" mt="12px">
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
            <Text fontSize={14} maxH="30px" py="4px">
              {name}
            </Text>
          </Box>
        ))}
      </HStack>
    </Box>
  );
}
