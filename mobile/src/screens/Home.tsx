import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Center,
  FlatList,
  Flex,
  Stack,
  Text,
  VStack,
  useToast,
} from "native-base";
import {
  ArrowRight,
  MagnifyingGlass,
  Plus,
  Sliders,
  Tag,
} from "phosphor-react-native";
import { useContext, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { Modalize } from "react-native-modalize";
import Button from "../components/Button";
import Filter from "../components/Filter";
import Input from "../components/Input";
import Item from "../components/Item";
import Loading from "../components/Loading";
import UserAvatar from "../components/UserAvatar";
import { AuthContext } from "../contexts/AuthContext";
import { AppNavigationProps } from "../routes/app.routes";
import api from "../services/api";
import { AppError } from "../utils/AppError";

type SearchProductProps = {
  searchProduct: string;
  is_new: boolean;
  accept_trade: boolean;
  payment_methods: string[];
};

export default function Home() {
  const toast = useToast();
  const { user } = useContext(AuthContext);
  const navigation = useNavigation<AppNavigationProps>();
  const modalizeRef = useRef<Modalize>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [myAdsLength, setMyAdsLength] = useState(0);
  const { control, handleSubmit, getValues, reset } =
    useForm<SearchProductProps>({
      defaultValues: {
        searchProduct: "",
        is_new: true,
        accept_trade: false,
        payment_methods: ["pix", "card", "boleto", "cash", "deposit"],
      },
    });
  const [isUsingFilter, setIsUsingFilter] = useState(false);

  const onOpenFilter = () => {
    modalizeRef.current?.open();
  };

  async function fetchProducts() {
    try {
      setIsLoading(true);

      const { data } = await api.get("/products");
      setProducts(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar o histórico";

      toast.show({
        title,
        bgColor: "red.400",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchMyAdsLength() {
    try {
      setIsLoading(true);

      const { data } = await api.get("/users/products");

      setMyAdsLength(data.length);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível a quantidade de seus anúncios";

      toast.show({
        title,
        bgColor: "red.400",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleProductSearch({ searchProduct }: SearchProductProps) {
    try {
      if (!searchProduct) return;

      setIsUsingFilter(true);

      const { data } = await api.get(`/products?query=${searchProduct}`);

      setProducts(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar o histórico";

      toast.show({
        title,
        bgColor: "red.400",
      });

      setIsUsingFilter(false);
    }
  }

  async function handleProductFilter({
    is_new,
    accept_trade,
    payment_methods,
  }: SearchProductProps) {
    try {
      setIsUsingFilter(true);

      const { data } = await api.get("/products", {
        params: {
          is_new,
          accept_trade,
          payment_methods,
        },
      });

      setProducts(data);

      modalizeRef.current?.close();
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar o histórico";

      toast.show({
        title,
        bgColor: "red.400",
      });

      setIsUsingFilter(false);
    }
  }

  function handleFilterReset() {
    reset({
      is_new: true,
      accept_trade: false,
      payment_methods: ["pix", "card", "boleto", "cash", "deposit"],
    });
    setIsUsingFilter(false);
    fetchProducts();
    modalizeRef.current?.close();
  }

  useEffect(() => {
    fetchProducts();
    fetchMyAdsLength();
  }, []);

  const EmptyList = () => (
    <Center>
      <Text color="gray.500">Nenhum anúncio encontrado :(</Text>
      {isUsingFilter && (
        <Button
          mt={4}
          title="Resetar filtros"
          variant="dark"
          w={null}
          onPress={() => {
            setIsUsingFilter(false);
            reset({ searchProduct: "" });
            fetchProducts();
          }}
        />
      )}
    </Center>
  );

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
                {myAdsLength}
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

        <Controller
          control={control}
          name="searchProduct"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Buscar anúncio"
              InputRightElement={
                <Center flexDirection="row" mr={4}>
                  <TouchableOpacity onPress={handleSubmit(handleProductSearch)}>
                    <MagnifyingGlass size={20} color="#3E3A40" weight="bold" />
                  </TouchableOpacity>
                  <Box w="1px" bg="gray.400" h="5" mx={3} />
                  <TouchableOpacity onPress={onOpenFilter}>
                    <Sliders size={20} color="#3E3A40" weight="bold" />
                  </TouchableOpacity>
                </Center>
              }
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      </VStack>
    </Box>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EDECEE" }}>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={products}
          renderItem={({ item }) => <Item data={item} homeItem={true} />}
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
          ListEmptyComponent={() => EmptyList()}
        />
      )}

      <Filter
        modalizeRef={modalizeRef}
        control={control}
        handleSubmit={handleSubmit}
        getValues={getValues}
        handleProductFilter={handleProductFilter}
        handleFilterReset={handleFilterReset}
      />
    </SafeAreaView>
  );
}
