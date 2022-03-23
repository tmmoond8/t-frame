import React from "react";
import { Text, RadioGroup, Stack, Radio } from "@chakra-ui/react";
import { usePlatform, Platform } from "../../navigation";
import Layout from "../../components/Layout";

export default function MyWatcha() {
  const platform = localStorage.getItem("AppPlatform") || "Cupertino";
  const { changePlatform } = usePlatform();
  const handleChangePlatform = (p: Platform) => {
    changePlatform(p);
    localStorage.setItem("AppPlatform", p);
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
