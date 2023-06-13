import { useNavigation } from "@react-navigation/native";
import { Box, Center, Image, Pressable, ScrollView, Text } from "native-base";
import { Eye, EyeSlash } from "phosphor-react-native";
import React, { useState } from "react";
import Logo from "../assets/mktsLogo.png";
import Button from "../components/Button";
import Input from "../components/Input";
import { AuthNavigationProps } from "../routes/auth.routes";

export default function SignIn() {
  const navigation = useNavigation<AuthNavigationProps>();
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <ScrollView flexGrow={1} showsVerticalScrollIndicator={false} bg="gray.100">
      <Box bg="gray.200" borderBottomRadius={24} py={16} px={12}>
        <Center>
          <Box mb={20}>
            <Image
              source={Logo}
              defaultSource={Logo}
              alt="Logo"
              resizeMode="contain"
            />
            <Text fontFamily="body" color="gray.500" mt={0.5}>
              Seu espaço de compra e venda
            </Text>
          </Box>

          <Text fontFamily="body" mb={4} color="gray.600">
            Acesse sua conta
          </Text>
          <Input placeholder="E-mail" mb={4} />
          <Input
            placeholder="Senha"
            mb={8}
            secureTextEntry={hidePassword}
            InputRightElement={
              <Pressable onPress={() => setHidePassword(!hidePassword)} mr={3}>
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

          <Button title="Entrar" variant="blue" />
        </Center>
      </Box>
      <Center py="56px" px={12}>
        <Text fontFamily="body" color="gray.600" mb={4}>
          Ainda não tem acesso?
        </Text>

        <Button
          title="Criar uma conta"
          onPress={() => navigation.navigate("signUp")}
        />
      </Center>
    </ScrollView>
  );
}
