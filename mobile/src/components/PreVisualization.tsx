import { Text, View } from "native-base";

export default function PreVisualization() {
  return (
    <View
      bg="blue.400"
      position="absolute"
      zIndex={99}
      top={0}
      pt={16}
      pb={4}
      w="full"
    >
      <Text
        fontFamily="heading"
        fontSize="md"
        textAlign="center"
        color="gray.100"
      >
        Pré visualização do anúncio
      </Text>
      <Text fontFamily="body" fontSize="sm" textAlign="center" color="gray.100">
        É assim que seu produto vai aparecer!
      </Text>
    </View>
  );
}
