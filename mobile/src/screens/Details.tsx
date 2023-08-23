import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  Box,
  Center,
  Flex,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import {
  ArrowLeft,
  Bank,
  Barcode,
  CreditCard,
  Money,
  QrCode,
  WhatsappLogo,
} from "phosphor-react-native";
import { useCallback, useLayoutEffect, useState } from "react";
import { Dimensions, SafeAreaView, TouchableOpacity } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import Button from "../components/Button";
import Loading from "../components/Loading";
import UserAvatar from "../components/UserAvatar";
import { AppNavigationProps } from "../routes/app.routes";
import api from "../services/api";

const width = Dimensions.get("window").width;

type ParamsProps = {
  product_id: string;
  user_id: string | undefined;
};

type ProductProps = {
  product_images: [
    {
      path: string;
    }
  ];
  name: string;
  description: string;
  is_new: boolean;
  price: number;
  accept_trade: boolean;
  payment_methods: [
    {
      key: string;
    }
  ];
  is_active: boolean;
  user: {
    name: string;
    avatar: string;
    tel: string;
  };
};

export default function Details() {
  const { params } = useRoute();
  const { product_id, user_id } = params as ParamsProps;
  const navigation = useNavigation<AppNavigationProps>();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<ProductProps>({} as ProductProps);

  console.log(product_id, user_id);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "",
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#1A181B" />
        </TouchableOpacity>
      ),
    });
  }, []);

  async function fetchProduct() {
    try {
      setIsLoading(true);

      const { data } = await api.get(`/products/${product_id}`);
      setProduct(data);
    } catch (error) {
      console.log("error on fetchProduct:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchProduct();
    }, [])
  );

  console.log("product in detail:", product);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EDECEE" }}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 64,
            }}
          >
            <Carousel
              width={width}
              height={280}
              data={product.product_images}
              loop={product?.product_images?.length > 1}
              renderItem={({ item }) => (
                <Image
                  source={{
                    uri: `${api.defaults.baseURL}/images/${item.path}`,
                  }}
                  w="full"
                  h={280}
                  alt="item"
                />
              )}
            />

            <Box px={6} pt={5} pb={6}>
              <HStack space={2} alignItems="center" mb={6}>
                <UserAvatar
                  width={6}
                  height={6}
                  borderWidth={2}
                  avatarUrl={product?.user?.avatar}
                />
                <Text fontFamily="body" color="gray.700">
                  {product?.user?.name}
                </Text>
              </HStack>

              <Flex>
                <Box
                  rounded="full"
                  bg="gray.300"
                  alignItems="center"
                  justifyContent="center"
                  px={2}
                  py={0.5}
                  alignSelf="flex-start"
                  mb={2}
                >
                  <Text fontFamily="heading" fontSize="2xs" color="gray.600">
                    {product.is_new ? "NOVO" : "USADO"}
                  </Text>
                </Box>

                <Center
                  flexDirection="row"
                  justifyContent="space-between"
                  mb={1}
                >
                  <Text fontFamily="heading" fontSize="lg" color="gray.700">
                    {product.name}
                  </Text>

                  <Flex flexDirection="row" alignItems="baseline">
                    <Text fontFamily="heading" color="blue.400">
                      R$
                    </Text>
                    <Text
                      fontFamily="heading"
                      fontSize="lg"
                      color="blue.400"
                      ml={0.5}
                    >
                      {product?.price?.toFixed(2).replace(".", ",")}
                    </Text>
                  </Flex>
                </Center>

                <Text fontFamily="body" color="gray.600" mb={6}>
                  {product.description}
                </Text>

                <HStack
                  flexDirection="row"
                  alignItems="center"
                  mb={4}
                  space={2}
                >
                  <Text fontFamily="heading" color="gray.600">
                    Aceita troca?
                  </Text>
                  <Text color="gray.600">
                    {product.accept_trade ? "Sim" : "Não"}
                  </Text>
                </HStack>

                <Flex>
                  <Text fontFamily="heading" color="gray.600" mb={2}>
                    Meios de pagamento:
                  </Text>

                  <VStack space={1}>
                    {product?.payment_methods?.some(
                      (method) => method.key === "boleto"
                    ) && (
                      <HStack flexDirection="row" alignItems="center" space={2}>
                        <Barcode size={18} color="#1A181B" />
                        <Text color="gray.600" fontFamily="body">
                          Boleto
                        </Text>
                      </HStack>
                    )}

                    {product?.payment_methods?.some(
                      (method) => method.key === "pix"
                    ) && (
                      <HStack flexDirection="row" alignItems="center" space={2}>
                        <QrCode size={18} color="#1A181B" />
                        <Text color="gray.600" fontFamily="body">
                          Pix
                        </Text>
                      </HStack>
                    )}

                    {product?.payment_methods?.some(
                      (method) => method.key === "cash"
                    ) && (
                      <HStack flexDirection="row" alignItems="center" space={2}>
                        <Money size={18} color="#1A181B" />
                        <Text color="gray.600" fontFamily="body">
                          Dinheiro
                        </Text>
                      </HStack>
                    )}

                    {product?.payment_methods?.some(
                      (method) => method.key === "card"
                    ) && (
                      <HStack flexDirection="row" alignItems="center" space={2}>
                        <CreditCard size={18} color="#1A181B" />
                        <Text color="gray.600" fontFamily="body">
                          Cartão de Crédito
                        </Text>
                      </HStack>
                    )}

                    {product?.payment_methods?.some(
                      (method) => method.key === "deposit"
                    ) && (
                      <HStack flexDirection="row" alignItems="center" space={2}>
                        <Bank size={18} color="#1A181B" />
                        <Text color="gray.600" fontFamily="body">
                          Depósito Bancário
                        </Text>
                      </HStack>
                    )}
                  </VStack>
                </Flex>
              </Flex>
            </Box>
          </ScrollView>

          <Box
            pt={5}
            px={6}
            pb={8}
            bg="gray.100"
            w="full"
            justifyContent="space-between"
            alignItems="center"
            position="absolute"
            bottom={0}
            flexDirection="row"
          >
            <Flex flexDirection="row" alignItems="baseline">
              <Text fontFamily="heading" color="blue.400">
                R$
              </Text>
              <Text
                fontFamily="heading"
                fontSize="xl"
                color="blue.400"
                lineHeight="md"
                ml={0.5}
              >
                {product?.price?.toFixed(2).replace(".", ",")}
              </Text>
            </Flex>

            <Button
              title="Entrar em contato"
              w={null}
              variant="blue"
              leftIcon={
                <WhatsappLogo size={16} color="#EDECEE" weight="fill" />
              }
              onPress={() => {}} /** @todo send to wpp number */
            />
          </Box>
        </>
      )}
    </SafeAreaView>
  );
}
