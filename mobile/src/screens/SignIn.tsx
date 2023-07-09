import { useNavigation } from "@react-navigation/native";
import { Box, Center, Image, Pressable, ScrollView, Text } from "native-base";
import { Eye, EyeSlash } from "phosphor-react-native";
import React, { useContext, useState } from "react";
import Logo from "../assets/mktsLogo.png";
import Button from "../components/Button";
import Input from "../components/Input";
import { AuthNavigationProps } from "../routes/auth.routes";
import { SafeAreaView } from "react-native";
import { AuthContext } from "../contexts/AuthContext";

export default function SignIn() {
  const navigation = useNavigation<AuthNavigationProps>();
  const { signIn, user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#EDECEE" }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F7F8" }}>
        <ScrollView
          flexGrow={1}
          showsVerticalScrollIndicator={false}
          bg="gray.100"
        >
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

              <Input
                placeholder="E-mail"
                mb={4}
                defaultValue={email}
                onChangeText={(text) => setEmail(text)}
              />

              <Input
                placeholder="Senha"
                mb={8}
                secureTextEntry={hidePassword}
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
                defaultValue={password}
                onChangeText={(text) => setPassword(text)}
              />

              <Button
                title="Entrar"
                variant="blue"
                onPress={() => signIn(email, password)}
              />
            </Center>
          </Box>

          <Center py="56px" px={12}>
            <Text fontFamily="body" color="gray.600" mb={3}>
              Ainda não tem acesso?
            </Text>

            <Button
              title="Criar uma conta"
              onPress={() => navigation.navigate("signUp")}
            />
          </Center>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
