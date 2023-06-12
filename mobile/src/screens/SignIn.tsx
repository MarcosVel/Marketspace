import { useNavigation } from "@react-navigation/native";
import { Box, Center, Image, ScrollView, Text } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import Logo from "../assets/mktsLogo.png";
import Input from "../components/Input";
import { AuthNavigationProps } from "../routes/auth.routes";

export default function SignIn() {
  const navigation = useNavigation<AuthNavigationProps>();

  return (
    <ScrollView flexGrow={1} showsVerticalScrollIndicator={false} bg="gray.100">
      <Box bg="gray.200" borderBottomRadius={24} px={12}>
        <Center>
          <Box mt={16} mb={20}>
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

          <Text mb={4}>Acesse sua conta</Text>
          <Input placeholder="E-mail" mb={4} />
          <Input placeholder="Senha" mb={8} />
        </Center>
      </Box>
      <TouchableOpacity onPress={() => navigation.navigate("signUp")}>
        <Text>Go to SignUp</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
