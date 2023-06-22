import { Flex, Text } from "native-base";
import { SafeAreaView } from "react-native";
import Button from "../components/Button";
import UserAvatar from "../components/UserAvatar";
import { Plus } from "phosphor-react-native";

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        mt={6}
        px={6}
        mb={8}
      >
        <Flex flexDirection="row" alignItems="center">
          <UserAvatar width={45} height={45} borderWidth={2} />
          <Flex ml={2}>
            <Text
              fontFamily="body"
              fontSize="md"
              color="gray.700"
              lineHeight="sm"
            >
              Boas vindas,
            </Text>
            <Text
              fontFamily="heading"
              fontSize="md"
              color="gray.700"
              lineHeight="sm"
            >
              Marcos!
            </Text>
          </Flex>
        </Flex>

        <Button
          title="Criar anúncio"
          w={null}
          variant="dark"
          leftIcon={<Plus color="#F7F7F8" size={18} />}
        />
      </Flex>
    </SafeAreaView>
  );
}
