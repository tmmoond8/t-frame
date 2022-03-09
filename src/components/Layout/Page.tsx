import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";

interface Props extends BoxProps {
  children: React.ReactNode;
}

export default function Page({ children, ...props }: Props) {
  return (
    <Box p="12px 0" h="100%" {...props} display="flex" flexDir="column">
      {children}
    </Box>
  );
}
