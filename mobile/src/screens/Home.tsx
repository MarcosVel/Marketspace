import { Box, Center, FlatList, Flex, Stack, Text, VStack } from "native-base";
import {
  ArrowRight,
  MagnifyingGlass,
  Plus,
  Sliders,
  Tag,
} from "phosphor-react-native";
import { SafeAreaView, TouchableOpacity } from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";
import UserAvatar from "../components/UserAvatar";
import Item from "../components/Item";

export default function Home() {
  const list = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

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

      <VStack px={6} mb={8}>
        <Text fontFamily="body" color="gray.500" mb={3}>
          Seus produtos anunciados para venda
        </Text>
        <Box
          bg="rgba(100, 122, 199, 0.1)"
          rounded={6}
          px={4}
          py={3}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Center flexDirection="row">
            <Tag size={22} color="#364D9D" />

            <Stack ml={4}>
              <Text
                fontFamily="heading"
                color="gray.600"
                fontSize="lg"
                lineHeight="xs"
              >
                4
              </Text>
              <Text fontFamily="body" color="gray.600" fontSize="xs">
                anúncios ativos
              </Text>
            </Stack>
          </Center>

          <TouchableOpacity>
            <Center flexDirection="row">
              <Text fontFamily="heading" color="blue.800" fontSize="xs" mr={2}>
                Meus anúncios
              </Text>
              <ArrowRight size={16} color="#364D9D" />
            </Center>
          </TouchableOpacity>
        </Box>
      </VStack>

      <VStack px={6}>
        <Text fontFamily="body" color="gray.500" mb={3}>
          Compre produtos variados
        </Text>

        <Input
          placeholder="Buscar anúncio"
          InputRightElement={
            <Center flexDirection="row" mr={4}>
              <TouchableOpacity>
                <MagnifyingGlass size={20} color="#3E3A40" weight="bold" />
              </TouchableOpacity>
              <Box w="1px" bg="gray.400" h="5" mx={3} />
              <TouchableOpacity>
                <Sliders size={20} color="#3E3A40" weight="bold" />
              </TouchableOpacity>
            </Center>
          }
        />
      </VStack>

      <FlatList
        data={list}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Item />}
        numColumns={2}
        contentContainerStyle={{
          padding: 24,
          gap: 24,
        }}
        columnWrapperStyle={{
          gap: 20,
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
