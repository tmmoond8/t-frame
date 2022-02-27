import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  RadioGroup,
  HStack,
  Radio,
  Text,
} from "@chakra-ui/react";

export default function EditorPage() {
  const radioStyles = {
    margin: "0 !important",
    padding: "8px",
  };
  return (
    <Box padding="32px 16px">
      <FormControl mb="20px">
        <FormLabel htmlFor="email">선택 키워드</FormLabel>
        <Input id="email" type="email" />
      </FormControl>
      <FormControl mb="20px">
        <FormLabel htmlFor="email">희망 위치</FormLabel>
        <Input id="email" type="email" />
      </FormControl>
      <FormLabel as="legend">회식 메뉴 선택</FormLabel>
      <FormControl as="fieldset" p="16px 0" mb="20px">
        <Text p="0 16px">맘에드는 메뉴를 선택하세요.</Text>
        <RadioGroup defaultValue="Itachi">
          <HStack spacing="24px" flexWrap="wrap">
            <Radio value="Sasuke" {...radioStyles}>
              초밥
            </Radio>
            <Radio value="Nagato" {...radioStyles}>
              삼겹살
            </Radio>
            <Radio value="Itachi" {...radioStyles}>
              치킨
            </Radio>
            <Radio value="Sage of the six Paths" {...radioStyles}>
              햄버거
            </Radio>
          </HStack>
        </RadioGroup>
      </FormControl>
      <FormControl mb="20px">
        <FormLabel htmlFor="email">희망 날짜</FormLabel>
        <Input id="email" type="email" />
      </FormControl>
      <FormLabel htmlFor="email">상세 요청</FormLabel>
      <Textarea placeholder="추가적으로 요청할 내용을 작성해주세요" />
    </Box>
  );
}
