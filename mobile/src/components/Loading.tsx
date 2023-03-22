import { Center, Spinner } from "native-base";
import React from "react";

export default function Loading() {
  return (
    <Center flex={1} bg="gray.200">
      <Spinner color="blue.400" size="lg" />
    </Center>
  );
}
