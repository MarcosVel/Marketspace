import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import {
  Box,
  Center,
  Image,
  Button as NativeBase,
  Pressable,
  ScrollView,
  Text,
  useToast,
} from "native-base";
import { Eye, EyeSlash, PencilSimpleLine } from "phosphor-react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native";
import * as yup from "yup";
import logo from "../assets/smallLogo.png";
import Button from "../components/Button";
import Input from "../components/Input";
import UserAvatar from "../components/UserAvatar";
import { AuthNavigationProps } from "../routes/auth.routes";
import api from "../services/api";

type FormDataProps = {
  name: string;
  email: string;
  tel: string;
  password: string;
  confirm_password: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Nome obrigatório"),
  email: yup
    .string()
    .required("E-mail obrigatório")
    .email("Informe um e-mail válido"),
  tel: yup
    .string()
    .required("Telefone obrigatório")
    .length(11, "Ex.: (99) 98765-4321"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "Mínimo 6 dígitos"),
  confirm_password: yup
    .string()
    .required("Confirme a senha")
    .oneOf([yup.ref("password"), null], "As senhas devem ser iguais"),
});

export default function SignUp() {
  const toast = useToast();
  const navigation = useNavigation<AuthNavigationProps>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: "",
      email: "",
      tel: "",
      password: "",
      confirm_password: "",
    },
    resolver: yupResolver(signUpSchema),
  });
  const [hidePassword, setHidePassword] = useState(true);
  const [avatarIsLoading, setAvatarIsLoading] = useState(false);
  const [userPhotoFile, setUserPhotoFile] = useState({} as any);

  async function handleAvatarSelection() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (photoSelected.canceled) {
        setAvatarIsLoading(false);
        return;
      }

      if (photoSelected.assets[0].uri) {
        setAvatarIsLoading(true);

        const fileExtension = photoSelected.assets[0].uri.split(".").pop();

        const photoFile = {
          uri: photoSelected.assets[0].uri,
          name: `${Date.now()}.${fileExtension}`,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        } as any;

        setUserPhotoFile(photoFile);
      }
    } catch (error) {
      console.log("Error on handleAvatarSelection:", error);
    } finally {
      setAvatarIsLoading(false);
    }
  }

  async function handleSignUp({ name, email, tel, password }: FormDataProps) {
    if (!userPhotoFile) return toast.show({ title: "Imagem obrigatória" });

    const formData = new FormData();
    formData.append("avatar", userPhotoFile);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("tel", tel);
    formData.append("password", password);

    await api
      .post("/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        toast.show({
          title: "Conta criada com sucesso!",
        });

        navigation.navigate("signIn");
      })
      .catch((error) => {
        console.log("error on handleSignUp:", error);
        console.log("error response:", error.response.data);
      });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EDECEE" }}>
      <ScrollView
        bg="gray.200"
        flexGrow={1}
        px={12}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets
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
            <Pressable mb={4} onPress={handleAvatarSelection}>
              <UserAvatar
                width={88}
                height={88}
                borderWidth={3}
                avatarIsLoading={avatarIsLoading}
                source={
                  userPhotoFile.uri
                    ? { uri: userPhotoFile.uri }
                    : require("../assets/emptyAvatar.png")
                }
              />
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
                onPress={handleAvatarSelection}
              >
                <PencilSimpleLine size={16} color="#F7F7F8" />
              </NativeBase>
            </Pressable>

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  mb={4}
                  placeholder="Nome"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
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
              name="tel"
              render={({ field: { onChange, value } }) => (
                <Input
                  mb={4}
                  placeholder="Telefone"
                  keyboardType="phone-pad"
                  maxLength={11}
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.tel?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  mb={4}
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

            <Controller
              control={control}
              name="confirm_password"
              render={({ field: { onChange, value } }) => (
                <Input
                  mb={6}
                  placeholder="Confirmar senha"
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
                  errorMessage={errors.confirm_password?.message}
                />
              )}
            />

            <Button
              title="Criar"
              variant="dark"
              onPress={handleSubmit(handleSignUp)}
            />
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
