import React from "react";
import { Text, RadioGroup, Stack, Radio } from "@chakra-ui/react";
import {} from "../../navigation";
import Layout from "../../components/Layout";

export default function MyWatcha() {
  const platform = localStorage.getItem("AppPlatform") || "Cupertino";
  const handleChangePlatform = (p: string) => {
    localStorage.setItem("AppPlatform", p);
    console.log("platform", p);
  };
  return (
    <Layout.Page px="16px">
      <Text as="div" fontSize={22} fontWeight={700}>
        MyWatcha
      </Text>
      <RadioGroup onChange={handleChangePlatform} defaultValue={platform}>
        <Stack direction="row">
          <Radio value="Cupertino">Cupertino</Radio>
          <Radio value="Android">Android</Radio>
          <Radio value="Web">Web</Radio>
        </Stack>
      </RadioGroup>
    </Layout.Page>
  );
}
