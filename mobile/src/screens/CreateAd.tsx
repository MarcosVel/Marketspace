import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import {
  Box,
  Checkbox,
  FlatList,
  Flex,
  FormControl,
  HStack,
  Image,
  KeyboardAvoidingView,
  Radio,
  ScrollView,
  Switch,
  Text,
  TextArea,
  VStack,
  useToast,
} from "native-base";
import { ArrowLeft, Plus, X } from "phosphor-react-native";
import { useLayoutEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView, TouchableOpacity } from "react-native";
import * as yup from "yup";
import Button from "../components/Button";
import Input from "../components/Input";
import { AppNavigationProps } from "../routes/app.routes";
import api from "../services/api";

type PhotoFileProps = {
  uri: string;
  type: string;
  name: string;
};

type FormDataProps = {
  name: string;
  description: string;
  is_new: string;
  price: number;
  accept_trade: boolean;
  payment_methods: string[];
};

const createAdSchema = yup.object({
  name: yup.string().required("O nome do produto é obrigatório"),
  description: yup.string().required("A descrição do produto é obrigatória"),
  is_new: yup.string().required("É obrigatório informar o estado do produto"),
  price: yup
    .number()
    .required("O preço do produto é obrigatório")
    .typeError("O preço do produto é obrigatório") // pice must be a `number` type, but the final value was: `NaN` (cast from the value `""`)
    .moreThan(0, "O preço do produto deve ser maior que 0"),
  accept_trade: yup
    .boolean()
    .required("É obrigatório informar se aceita troca"),
  payment_methods: yup
    .array()
    .min(1, "É obrigatório informar os meios de pagamento aceitos")
    .required("É obrigatório informar os meios de pagamento aceitos"),
});

export default function CreateAd() {
  const toast = useToast();
  const navigation = useNavigation<AppNavigationProps>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: "",
      description: "",
      is_new: "",
      accept_trade: false,
      payment_methods: [],
    },
    resolver: yupResolver(createAdSchema),
  });
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
        selectionLimit: 3 - images.length,
        orderedSelection: true,
      });

      if (photosSelected.canceled) return;

      if (photosSelected.assets) {
        const newSelectedPhotos = photosSelected.assets.map((photo) => {
          const filesExtension = photo.uri.split(".").pop();

          const photoFile = {
            uri: photo.uri,
            type: `${photo.type}/${filesExtension}`,
            name: `${Date.now()}.${filesExtension}`,
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

  async function handleAdCreation({
    name,
    description,
    is_new,
    price,
    accept_trade,
    payment_methods,
  }: FormDataProps) {
    try {
      if (images.length < 1) {
        return toast.show({
          title: "Selecione pelo menos uma imagem",
        });
      }

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
      images.forEach((image) => {
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
                      display: images.length > 2 ? "none" : "flex",
                    }}
                    onPress={handleProductsImages}
                    disabled={images.length > 2}
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

              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Título do anúncio"
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.name?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) => (
                  <FormControl isInvalid={!!errors.description?.message}>
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
                      value={value}
                      onChangeText={onChange}
                      maxLength={300}
                    />
                    <FormControl.ErrorMessage _text={{ color: "red.400" }}>
                      {errors.description?.message}
                    </FormControl.ErrorMessage>
                  </FormControl>
                )}
              />

              <Controller
                control={control}
                name="is_new"
                render={({ field: { onChange, value } }) => (
                  <FormControl isInvalid={!!errors.is_new?.message}>
                    <Radio.Group
                      name="productName"
                      onChange={onChange}
                      // onChange={(nextValue) => onChange(nextValue)}
                      value={value}
                      flexDirection="row"
                      alignContent="center"
                      style={{
                        gap: 24,
                      }}
                    >
                      <Radio
                        value="new"
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
                        value="used"
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
                    </Radio.Group>

                    <FormControl.ErrorMessage _text={{ color: "red.400" }}>
                      {errors.is_new?.message}
                    </FormControl.ErrorMessage>
                  </FormControl>
                )}
              />
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

              <Controller
                control={control}
                name="price"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Valor do produto"
                    keyboardType="decimal-pad"
                    InputLeftElement={
                      <Text
                        fontSize="md"
                        color="gray.700"
                        fontFamily="body"
                        ml={4}
                      >
                        R$
                      </Text>
                    }
                    px={0}
                    pl={2}
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.price?.message}
                  />
                )}
              />
            </VStack>

            <VStack px={6} mt={4} mb={7}>
              <Text fontFamily="heading" color="gray.600" mb={3}>
                Aceita troca?
              </Text>
              <Controller
                control={control}
                name="accept_trade"
                render={({ field: { onChange, value } }) => (
                  <Switch
                    size="md"
                    offTrackColor="gray.300"
                    onTrackColor="blue.400"
                    mb={4}
                    value={value}
                    onToggle={onChange}
                  />
                )}
              />

              <Text fontFamily="heading" color="gray.600" mb={3}>
                Meios de pagamento aceitos
              </Text>
              <VStack space={2}>
                <Controller
                  control={control}
                  name="payment_methods"
                  render={({ field: { onChange, value } }) => (
                    <FormControl isInvalid={!!errors.payment_methods?.message}>
                      <Checkbox.Group
                        // onChange={setGroupValues}
                        // value={groupValues}
                        onChange={onChange}
                        value={value}
                      >
                        <Checkbox
                          value="boleto"
                          _checked={{
                            bg: "blue.400",
                            borderColor: "blue.400",
                          }}
                          borderColor="gray.300"
                        >
                          <Text
                            fontFamily="body"
                            fontSize="md"
                            color="gray.600"
                          >
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
                          <Text
                            fontFamily="body"
                            fontSize="md"
                            color="gray.600"
                          >
                            Pix
                          </Text>
                        </Checkbox>

                        <Checkbox
                          value="cash"
                          _checked={{
                            bg: "blue.400",
                            borderColor: "blue.400",
                          }}
                          borderColor="gray.300"
                        >
                          <Text
                            fontFamily="body"
                            fontSize="md"
                            color="gray.600"
                          >
                            Dinheiro
                          </Text>
                        </Checkbox>

                        <Checkbox
                          value="card"
                          _checked={{
                            bg: "blue.400",
                            borderColor: "blue.400",
                          }}
                          borderColor="gray.300"
                        >
                          <Text
                            fontFamily="body"
                            fontSize="md"
                            color="gray.600"
                          >
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
                          <Text
                            fontFamily="body"
                            fontSize="md"
                            color="gray.600"
                          >
                            Depósito Bancário
                          </Text>
                        </Checkbox>
                      </Checkbox.Group>

                      <FormControl.ErrorMessage _text={{ color: "red.400" }}>
                        {errors.payment_methods?.message}
                      </FormControl.ErrorMessage>
                    </FormControl>
                  )}
                />
              </VStack>
            </VStack>

            <Box pt={5} px={6} pb={3} bg="gray.100" w="full">
              <HStack space={3}>
                <Button title="Cancelar" onPress={() => navigation.goBack()} />

                <Button
                  title="Avançar"
                  variant="dark"
                  onPress={handleSubmit(handleAdCreation)}
                />
              </HStack>
            </Box>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#F7F7F8" }} />
    </>
  );
}
