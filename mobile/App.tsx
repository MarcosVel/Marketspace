import {
  Karla_400Regular,
  Karla_700Bold,
  useFonts,
} from "@expo-google-fonts/karla";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, Text } from "native-base";
import { StyleSheet, View } from "react-native";
import Loading from "./src/components/Loading";
import { THEME } from "./src/theme";

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      {fontsLoaded ? (
        <View style={styles.container}>
          <Text color="blue.800">
            Open up App.tsx to start test on your app!
          </Text>
          <StatusBar style="auto" />
        </View>
      ) : (
        <Loading />
      )}
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
