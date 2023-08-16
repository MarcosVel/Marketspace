import { useNavigation } from "@react-navigation/native";
import { Box, Center, FlatList, Flex, Stack, Text, VStack } from "native-base";
import {
  ArrowRight,
  MagnifyingGlass,
  Plus,
  Sliders,
  Tag,
} from "phosphor-react-native";
import { useContext, useRef } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { Modalize } from "react-native-modalize";
import Button from "../components/Button";
import Filter from "../components/Filter";
import Input from "../components/Input";
import Item from "../components/Item";
import UserAvatar from "../components/UserAvatar";
import { AuthContext } from "../contexts/AuthContext";
import { AppNavigationProps } from "../routes/app.routes";

export default function Home() {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation<AppNavigationProps>();
  const modalizeRef = useRef<Modalize>(null);
  const list = Array(40).fill(0);

  const onOpenFilter = () => {
    modalizeRef.current?.open();
  };

  const ListHeader = () => (
    <Box bg="gray.200" pt={6}>
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        mb={8}
      >
        <Flex flexDirection="row" alignItems="center">
          <UserAvatar
            width={45}
            height={45}
            borderWidth={2}
            avatarUrl={user.avatar}
          />
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
              {user.name}!
            </Text>
          </Flex>
        </Flex>

        <Button
          title="Criar anúncio"
          w={null}
          variant="dark"
          leftIcon={<Plus color="#F7F7F8" size={18} />}
          onPress={() => navigation.navigate("createAd")}
        />
      </Flex>

      <VStack mb={8}>
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

          <TouchableOpacity onPress={() => navigation.navigate("myAds")}>
            <Center flexDirection="row">
              <Text fontFamily="heading" color="blue.800" fontSize="xs" mr={2}>
                Meus anúncios
              </Text>
              <ArrowRight size={16} color="#364D9D" />
            </Center>
          </TouchableOpacity>
        </Box>
      </VStack>

      <VStack>
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
              <TouchableOpacity onPress={onOpenFilter}>
                <Sliders size={20} color="#3E3A40" weight="bold" />
              </TouchableOpacity>
            </Center>
          }
        />
      </VStack>
    </Box>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EDECEE" }}>
      <FlatList
        data={list}
        renderItem={({ item }) => <Item />}
        numColumns={2}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: 36,
          gap: 24,
        }}
        columnWrapperStyle={{
          gap: 20,
        }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeader}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        ListEmptyComponent={() => (
          <Text color="gray.500">Nenhum anúncio encontrado :(</Text>
        )}
      />

      <Filter modalizeRef={modalizeRef} />
    </SafeAreaView>
  );
}
