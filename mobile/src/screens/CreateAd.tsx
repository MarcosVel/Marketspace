import { useNavigation } from "@react-navigation/native";
import {
  Box,
  FlatList,
  Flex,
  HStack,
  Image,
  KeyboardAvoidingView,
  Radio,
  ScrollView,
  Text,
  TextArea,
  VStack,
} from "native-base";
import { ArrowLeft, Plus, X } from "phosphor-react-native";
import { useLayoutEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import Input from "../components/Input";

export default function CreateAd() {
  const navigation = useNavigation();
  const images = [
    "https://lasmagrelas.com.br/wp-content/uploads/2021/10/IMG_3705.png",
    "https://motociclismoonline.com.br/wp-content/uploads/2022/04/Yamaha-MT-03_Renato-Duraes.jpg",
    "https://lasmagrelas.com.br/wp-content/uploads/2021/10/IMG_3705.png",
  ];

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EDECEE" }}>
      <ScrollView>
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
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={({ item }) => (
              <Box>
                <Image
                  source={{ uri: item }}
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
              >
                <Plus size={24} color="#9F9BA1" />
              </TouchableOpacity>
            )}
          />
        </Flex>

        <VStack px={6} space={4}>
          <Text fontFamily="heading" fontSize="md" color="gray.600" mb={1}>
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
      </ScrollView>
    </SafeAreaView>
  );
}
