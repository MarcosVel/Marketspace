import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Box,
  Center,
  Flex,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
  useToast,
} from "native-base";
import {
  ArrowLeft,
  Bank,
  Barcode,
  CreditCard,
  Money,
  QrCode,
  Tag,
} from "phosphor-react-native";
import { useContext } from "react";
import { Dimensions, SafeAreaView } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import Button from "../components/Button";
import PreVisualization from "../components/PreVisualization";
import UserAvatar from "../components/UserAvatar";
import { AuthContext } from "../contexts/AuthContext";
import { AppNavigationProps } from "../routes/app.routes";
import api from "../services/api";

const width = Dimensions.get("window").width;

type ParamsProps = {
  product_images: [
    {
      name: string;
      uri: string;
      type: string;
    }
  ];
  name: string;
  description: string;
  is_new: string;
  price: number;
  accept_trade: boolean;
  payment_methods: string[];
};

export default function PrePublishAd() {
  const toast = useToast();
  const { user } = useContext(AuthContext);
  const { params } = useRoute();
  const {
    product_images,
    name,
    description,
    is_new,
    price,
    accept_trade,
    payment_methods,
  } = params as ParamsProps;
  const idProductToEdit = params?.product_id;
  const navigation = useNavigation<AppNavigationProps>();

  async function handleAdCreation() {
    try {
      const { data } = await api.post("/products", {
        name,
        description,
        is_new: is_new === "new" ? true : false,
        price,
        accept_trade,
        payment_methods,
      });

      const formData = new FormData();
      formData.append("product_id", data.id);
      // Convert and append each image to the formData
      product_images.forEach((image) => {
        formData.append("images", image);
      });

      await api
        .post("/products/images", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          toast.show({
            title: "Anúncio criado com sucesso!",
          });
          navigation.navigate("myAds");
        })
        .catch((error) => {
          console.log("error to add product images:", error);
        });
    } catch (error) {
      console.log("error on handleAdCreation:", error);
    }
  }

  async function handleAdEdition() {
    try {
      // const { data } =
      await api.put(`/products/${idProductToEdit}`, {
        name,
        description,
        is_new: is_new === "new" ? true : false,
        price,
        accept_trade,
        payment_methods,
      });

      // if (product_images.uri) {}

      toast.show({
        title: "Anúncio editado com sucesso!",
      });
      navigation.navigate("myAds");
    } catch (error) {
      console.log("error on handleAdEdition:", error);
      toast.show({
        title: "Erro ao editar anúncio!",
        bgColor: "red.400",
      });
    }
  }

  console.log("product_images:", product_images);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EDECEE" }}>
      <PreVisualization />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 66,
          paddingBottom: 64,
        }}
      >
        <Carousel
          width={width}
          height={280}
          data={product_images}
          loop={product_images.length > 1}
          renderItem={({ item }) => (
            <Image
              source={{
                uri: item.uri
                  ? item.uri
                  : `${api.defaults.baseURL}/images/${item.path}`,
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
              avatarUrl={user.avatar}
            />
            <Text fontFamily="body" color="gray.700">
              {user.name}
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
                {is_new ? "NOVO" : "USADO"}
              </Text>
            </Box>

            <Center flexDirection="row" justifyContent="space-between" mb={1}>
              <Text fontFamily="heading" fontSize="lg" color="gray.700">
                {name}
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
                  {price.toFixed(2).replace(".", ",")}
                </Text>
              </Flex>
            </Center>

            <Text fontFamily="body" color="gray.600" mb={6}>
              {description}
            </Text>

            <HStack flexDirection="row" alignItems="center" mb={4} space={2}>
              <Text fontFamily="heading" color="gray.600">
                Aceita troca?
              </Text>
              <Text color="gray.600">{accept_trade ? "Sim" : "Não"}</Text>
            </HStack>

            <Flex>
              <Text fontFamily="heading" color="gray.600" mb={2}>
                Meios de pagamento:
              </Text>

              <VStack space={1}>
                {payment_methods.includes("boleto") && (
                  <HStack flexDirection="row" alignItems="center" space={2}>
                    <Barcode size={18} color="#1A181B" />
                    <Text color="gray.600" fontFamily="body">
                      Boleto
                    </Text>
                  </HStack>
                )}

                {payment_methods.includes("pix") && (
                  <HStack flexDirection="row" alignItems="center" space={2}>
                    <QrCode size={18} color="#1A181B" />
                    <Text color="gray.600" fontFamily="body">
                      Pix
                    </Text>
                  </HStack>
                )}

                {payment_methods.includes("cash") && (
                  <HStack flexDirection="row" alignItems="center" space={2}>
                    <Money size={18} color="#1A181B" />
                    <Text color="gray.600" fontFamily="body">
                      Dinheiro
                    </Text>
                  </HStack>
                )}

                {payment_methods.includes("card") && (
                  <HStack flexDirection="row" alignItems="center" space={2}>
                    <CreditCard size={18} color="#1A181B" />
                    <Text color="gray.600" fontFamily="body">
                      Cartão de Crédito
                    </Text>
                  </HStack>
                )}

                {payment_methods.includes("deposit") && (
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
        <HStack space={3}>
          <Button
            title="Voltar e editar"
            leftIcon={<ArrowLeft size={16} color="#3E3A40" />}
            onPress={() => navigation.goBack()}
          />

          <Button
            title="Publicar"
            variant="blue"
            leftIcon={<Tag size={16} color="#EDECEE" />}
            onPress={idProductToEdit ? handleAdEdition : handleAdCreation}
          />
        </HStack>
      </Box>
    </SafeAreaView>
  );
}
