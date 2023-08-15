import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Center,
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
} from "native-base";
import { Eye, EyeSlash } from "phosphor-react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native";
import Logo from "../assets/mktsLogo.png";
import Button from "../components/Button";
import Input from "../components/Input";
import { AuthContext } from "../contexts/AuthContext";
import { AuthNavigationProps } from "../routes/auth.routes";
import { Controller, useForm } from "react-hook-form";

type FormDataProps = {
  email: string;
  password: string;
};

export default function SignIn() {
  const navigation = useNavigation<AuthNavigationProps>();
  const { signIn } = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>();
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  async function handleSignIn({ email, password }: FormDataProps) {
    try {
      setLoading(true);
      await signIn(email, password);
    } catch (error) {
      console.log("Error on handleSignIn", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <KeyboardAvoidingView flex={1} behavior="padding">
        <SafeAreaView style={{ flex: 0, backgroundColor: "#EDECEE" }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F7F8" }}>
          <ScrollView
            flexGrow={1}
            showsVerticalScrollIndicator={false}
            bg="gray.100"
            automaticallyAdjustKeyboardInsets
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

                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: "Informe o e-mail",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Informe um e-mail válido",
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      mb={4}
                      placeholder="E-mail"
                      autoCapitalize="none"
                      keyboardType="email-address"
                      value={value}
                      onChangeText={onChange}
                      errorMessage={errors.email?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="password"
                  rules={{ required: "Informe a senha" }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      mb={8}
                      placeholder="Senha"
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
                      value={value}
                      onChangeText={onChange}
                      errorMessage={errors.password?.message}
                    />
                  )}
                />

                <Button
                  title="Entrar"
                  variant="blue"
                  onPress={handleSubmit(handleSignIn)}
                  isLoading={loading}
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
      </KeyboardAvoidingView>
    </>
  );
}
