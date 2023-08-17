import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import {
  Box,
  Checkbox,
  FlatList,
  Flex,
  HStack,
  Image,
  KeyboardAvoidingView,
  Radio,
  ScrollView,
  Switch,
  Text,
  TextArea,
  VStack,
} from "native-base";
import { ArrowLeft, Plus, X } from "phosphor-react-native";
import { useLayoutEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";

type PhotoFileProps = {
  uri: string;
  type: string;
  name: string;
};

export default function CreateAd() {
  const navigation = useNavigation();
  const [images, setImages] = useState<PhotoFileProps[]>([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Criar anúncio",
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#1A181B" />
        </TouchableOpacity>
      ),
    });
  }, []);

  async function handleProductsImages() {
    try {
      const photosSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [1, 1],
        quality: 1,
        allowsMultipleSelection: true,
        selectionLimit: 3,
        orderedSelection: true,
      });

      if (photosSelected.canceled) return;

      if (photosSelected.assets) {
        const newSelectedPhotos = photosSelected.assets.map((photo) => {
          const filesExtension = photo.uri.split(".").pop();

          const photoName = photo.uri.split("/");

          const photoFile = {
            uri: photo.uri,
            type: `${photo.type}/${filesExtension}`,
            name: `${photoName[photoName.length - 1]}`,
          };

          return photoFile;
        });

        setImages((prevSelectedPhotos) => [
          ...prevSelectedPhotos,
          ...newSelectedPhotos,
        ]);
      }
    } catch (error) {
      console.log("error on handleProductsImages:", error);
    }
  }

  function handleRemoveImage(image: PhotoFileProps) {
    try {
      setImages((prevImages) =>
        prevImages.filter((img) => img.uri !== image.uri)
      );
    } catch (error) {
      console.log("error on handleRemoveImage:", error);
    }
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#EDECEE" }}>
        <ScrollView
          automaticallyAdjustKeyboardInsets
          showsVerticalScrollIndicator={false}
        >
          <KeyboardAvoidingView style={{ flex: 1 }}>
            <VStack px={6} mt={3}>
              <Text fontFamily="heading" fontSize="md" color="gray.600" mb={1}>
                Imagens
              </Text>
              <Text fontFamily="body" color="gray.500" mb={4}>
                Escolha até 3 imagens para mostrar o quando o seu produto é
                incrível!
              </Text>
            </VStack>

            <Flex flexDirection="row" alignItems="center" mb={8}>
              <FlatList
                data={images}
                keyExtractor={(item) => item.uri}
                showsHorizontalScrollIndicator={false}
                horizontal
                renderItem={({ item }) => (
                  <Box>
                    <Image
                      source={{ uri: item.uri }}
                      h={100}
                      w={100}
                      rounded="md"
                      alt="item"
                    />
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#3E3A40",
                        borderRadius: 99,
                        position: "absolute",
                        padding: 2,
                        top: 4,
                        right: 4,
                      }}
                      activeOpacity={0.4}
                      hitSlop={20}
                      onPress={() => handleRemoveImage(item)}
                    >
                      <X size={12} color="#fff" />
                    </TouchableOpacity>
                  </Box>
                )}
                contentContainerStyle={{
                  gap: 8,
                  paddingHorizontal: 24,
                }}
                ListFooterComponent={() => (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 6,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#D9D8DA",
                    }}
                    onPress={handleProductsImages}
                  >
                    <Plus size={24} color="#9F9BA1" />
                  </TouchableOpacity>
                )}
              />
            </Flex>

            <VStack px={6} space={4}>
              <Text
                fontFamily="heading"
                fontSize="md"
                color="gray.600"
                lineHeight="2xs"
                mb={1}
              >
                Sobre o produto
              </Text>

              <Input placeholder="Título do anúncio" />

              <TextArea
                placeholder="Descrição do produto"
                autoCompleteType={true}
                py={3}
                px={4}
                h={160}
                bg="gray.100"
                rounded={6}
                borderWidth={0}
                fontSize="md"
                fontFamily="body"
                placeholderTextColor="gray.400"
                color="gray.600"
                _focus={{
                  bg: "gray.100",
                }}
              />

              <Radio.Group name="productName">
                <HStack alignItems="center" space={6}>
                  <Radio
                    value="1"
                    bg="gray.200"
                    _checked={{
                      borderColor: "blue.400",
                    }}
                    _icon={{
                      color: "blue.400",
                    }}
                  >
                    <Text fontFamily="body" fontSize="md" color="gray.600">
                      Produto novo
                    </Text>
                  </Radio>

                  <Radio
                    value="2"
                    bg="gray.200"
                    _checked={{
                      borderColor: "blue.400",
                    }}
                    _icon={{
                      color: "blue.400",
                    }}
                  >
                    <Text fontFamily="body" fontSize="md" color="gray.600">
                      Produto usado
                    </Text>
                  </Radio>
                </HStack>
              </Radio.Group>
            </VStack>

            <VStack px={6} space={4} mt={8}>
              <Text
                fontFamily="heading"
                fontSize="md"
                lineHeight="2xs"
                color="gray.600"
                mb={1}
              >
                Venda
              </Text>

              <Input
                placeholder="Valor do produto"
                keyboardType="numeric"
                InputLeftElement={
                  <Text fontSize="md" color="gray.700" fontFamily="body" ml={4}>
                    R$
                  </Text>
                }
                px={0}
                pl={2}
              />
            </VStack>

            <VStack px={6} mt={4} mb={7}>
              <Text fontFamily="heading" color="gray.600" mb={3}>
                Aceita troca?
              </Text>
              <Switch
                size="md"
                offTrackColor="gray.300"
                onTrackColor="blue.400"
                mb={4}
              />

              <Text fontFamily="heading" color="gray.600" mb={3}>
                Meios de pagamento aceitos
              </Text>
              <VStack space={2}>
                <Checkbox
                  value="boleto"
                  _checked={{
                    bg: "blue.400",
                    borderColor: "blue.400",
                  }}
                  borderColor="gray.300"
                >
                  <Text fontFamily="body" fontSize="md" color="gray.600">
                    Boleto
                  </Text>
                </Checkbox>

                <Checkbox
                  value="pix"
                  _checked={{
                    bg: "blue.400",
                    borderColor: "blue.400",
                  }}
                  borderColor="gray.300"
                >
                  <Text fontFamily="body" fontSize="md" color="gray.600">
                    Pix
                  </Text>
                </Checkbox>

                <Checkbox
                  value="dinheiro"
                  _checked={{
                    bg: "blue.400",
                    borderColor: "blue.400",
                  }}
                  borderColor="gray.300"
                >
                  <Text fontFamily="body" fontSize="md" color="gray.600">
                    Dinheiro
                  </Text>
                </Checkbox>

                <Checkbox
                  value="credit"
                  _checked={{
                    bg: "blue.400",
                    borderColor: "blue.400",
                  }}
                  borderColor="gray.300"
                >
                  <Text fontFamily="body" fontSize="md" color="gray.600">
                    Cartão de Crédito
                  </Text>
                </Checkbox>

                <Checkbox
                  value="deposit"
                  _checked={{
                    bg: "blue.400",
                    borderColor: "blue.400",
                  }}
                  borderColor="gray.300"
                >
                  <Text fontFamily="body" fontSize="md" color="gray.600">
                    Depósito Bancário
                  </Text>
                </Checkbox>
              </VStack>
            </VStack>

            <Box pt={5} px={6} pb={3} bg="gray.100" w="full">
              <HStack space={3}>
                <Button title="Cancelar" />

                <Button title="Avançar" variant="dark" />
              </HStack>
            </Box>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#F7F7F8" }} />
    </>
  );
}
