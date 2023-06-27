import { useNavigation } from "@react-navigation/native";
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
} from "phosphor-react-native";
import { useLayoutEffect } from "react";
import { Dimensions, SafeAreaView, TouchableOpacity } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import UserAvatar from "../components/UserAvatar";
import { AppNavigationProps } from "../routes/app.routes";

const width = Dimensions.get("window").width;

export default function Details() {
  const navigation = useNavigation<AppNavigationProps>();
  const images = [
    "https://lasmagrelas.com.br/wp-content/uploads/2021/10/IMG_3705.png",
    "https://motociclismoonline.com.br/wp-content/uploads/2022/04/Yamaha-MT-03_Renato-Duraes.jpg",
  ];

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EDECEE" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Carousel
          width={width}
          height={280}
          data={images}
          renderItem={({ item }) => (
            <Image
              source={{
                uri: item,
              }}
              w="full"
              h={280}
              alt="item"
            />
          )}
        />

        <Box px={6} pt={5} pb={6}>
          <HStack space={2} alignItems="center" mb={6}>
            <UserAvatar width={6} height={6} borderWidth={2} />
            <Text fontFamily="body" color="gray.700">
              Marcos Veloso
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
                NOVO
              </Text>
            </Box>

            <Center flexDirection="row" justifyContent="space-between" mb={1}>
              <Text fontFamily="heading" fontSize="lg" color="gray.700">
                Bicicleta
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
                  54,90
                </Text>
              </Flex>
            </Center>

            <Text fontFamily="body" color="gray.600" mb={6}>
              Cras congue cursus in tortor sagittis placerat nunc, tellus arcu.
              Vitae ante leo eget maecenas urna mattis cursus. Mauris metus amet
              nibh mauris mauris accumsan, euismod. Aenean leo nunc, purus
              iaculis in aliquam.
            </Text>

            <HStack flexDirection="row" alignItems="center" mb={4} space={2}>
              <Text fontFamily="heading" color="gray.600">
                Aceita troca?
              </Text>
              <Text color="gray.600">Sim</Text>
            </HStack>

            <Flex>
              <Text fontFamily="heading" color="gray.600" mb={2}>
                Meios de pagamento:
              </Text>

              <VStack space={1}>
                <HStack flexDirection="row" alignItems="center" space={2}>
                  <Barcode size={18} color="#1A181B" />
                  <Text color="gray.600" fontFamily="body">
                    Boleto
                  </Text>
                </HStack>

                <HStack flexDirection="row" alignItems="center" space={2}>
                  <QrCode size={18} color="#1A181B" />
                  <Text color="gray.600" fontFamily="body">
                    Pix
                  </Text>
                </HStack>

                <HStack flexDirection="row" alignItems="center" space={2}>
                  <Money size={18} color="#1A181B" />
                  <Text color="gray.600" fontFamily="body">
                    Dinheiro
                  </Text>
                </HStack>

                <HStack flexDirection="row" alignItems="center" space={2}>
                  <CreditCard size={18} color="#1A181B" />
                  <Text color="gray.600" fontFamily="body">
                    Cartão de Crédito
                  </Text>
                </HStack>

                <HStack flexDirection="row" alignItems="center" space={2}>
                  <Bank size={18} color="#1A181B" />
                  <Text color="gray.600" fontFamily="body">
                    Depósito Bancário
                  </Text>
                </HStack>
              </VStack>
            </Flex>
          </Flex>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
