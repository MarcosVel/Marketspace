import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigationProps } from "../routes/auth.routes";

export default function SignIn() {
  const navigation = useNavigation<AuthNavigationProps>();

  return (
    <View>
      <Text>SignIn</Text>
      <TouchableOpacity onPress={() => navigation.navigate("signUp")}>
        <Text>Go to SignUp</Text>
      </TouchableOpacity>
    </View>
  );
}
