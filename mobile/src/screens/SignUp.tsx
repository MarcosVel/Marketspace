import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Center,
  Image,
  Button as NativeBase,
  Pressable,
  ScrollView,
  Text,
} from "native-base";
import { Eye, EyeSlash, PencilSimpleLine } from "phosphor-react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import logo from "../assets/smallLogo.png";
import Button from "../components/Button";
import Input from "../components/Input";
import UserAvatar from "../components/UserAvatar";
import { AuthNavigationProps } from "../routes/auth.routes";

export default function SignUp() {
  const navigation = useNavigation<AuthNavigationProps>();
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EDECEE" }}>
      <ScrollView
        bg="gray.200"
        flexGrow={1}
        px={12}
        showsVerticalScrollIndicator={false}
      >
        <Box mt={5} mb={8}>
          <Center>
            <Image
              source={logo}
              defaultSource={logo}
              resizeMode="contain"
              alt="logo"
              mb={3}
            />

            <Text
              fontFamily="heading"
              fontSize="lg"
              lineHeight="26px"
              color="gray.700"
              mb={2}
            >
              Boas vindas!
            </Text>

            <Text
              fontFamily="body"
              fontSize="sm"
              color="gray.600"
              textAlign="center"
              lineHeight="18px"
            >
              Crie sua conta e use o espaço para comprar itens variados e vender
              seus produtos
            </Text>
          </Center>
        </Box>

        <Box mb={10}>
          <Center>
            <Pressable mb={4}>
              <UserAvatar width={88} height={88} borderWidth={3} />
              <NativeBase
                w={10}
                h={10}
                bg="blue.400"
                rounded="full"
                _pressed={{
                  bg: "blue.800",
                }}
                position="absolute"
                bottom={0}
                right={-8}
              >
                <PencilSimpleLine size={16} color="#F7F7F8" />
              </NativeBase>
            </Pressable>

            <Input placeholder="Nome" mb={4} />

            <Input placeholder="E-mail" mb={4} />

            <Input placeholder="Telefone" mb={4} />

            <Input
              placeholder="Senha"
              mb={4}
              InputRightElement={
                <Pressable
                  onPress={() => setHidePassword(!hidePassword)}
                  mr={4}
                >
                  {({ isPressed }) => (
                    <Box
                      style={{
                        opacity: isPressed ? 0.2 : 1,
                        transform: [
                          {
                            scale: isPressed ? 0.85 : 1,
                          },
                        ],
                      }}
                    >
                      {hidePassword ? (
                        <EyeSlash color="#5F5B62" size={20} />
                      ) : (
                        <Eye color="#5F5B62" size={20} />
                      )}
                    </Box>
                  )}
                </Pressable>
              }
            />

            <Input
              placeholder="Confirmar senha"
              mb={6}
              InputRightElement={
                <Pressable
                  onPress={() => setHidePassword(!hidePassword)}
                  mr={4}
                >
                  {({ isPressed }) => (
                    <Box
                      style={{
                        opacity: isPressed ? 0.2 : 1,
                        transform: [
                          {
                            scale: isPressed ? 0.85 : 1,
                          },
                        ],
                      }}
                    >
                      {hidePassword ? (
                        <EyeSlash color="#5F5B62" size={20} />
                      ) : (
                        <Eye color="#5F5B62" size={20} />
                      )}
                    </Box>
                  )}
                </Pressable>
              }
            />

            <Button title="Criar" variant="dark" />
          </Center>
        </Box>

        <Center mb={16}>
          <Text fontFamily="body" fontSize="sm" color="gray.600" mb={3}>
            Já tem uma conta?
          </Text>

          <Button
            title="Ir para o login"
            onPress={() => navigation.navigate("signIn")}
          />
        </Center>
      </ScrollView>
    </SafeAreaView>
  );
}
