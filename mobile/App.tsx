import {
  Karla_400Regular,
  Karla_700Bold,
  useFonts,
} from "@expo-google-fonts/karla";
import { NativeBaseProvider } from "native-base";
import { SafeAreaView, StatusBar } from "react-native";
import Loading from "./src/components/Loading";
import Routes from "./src/routes";
import { THEME } from "./src/theme";

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EDECEE" }}>
      <StatusBar barStyle="dark-content" />
      <NativeBaseProvider theme={THEME}>
        {fontsLoaded ? <Routes /> : <Loading />}
      </NativeBaseProvider>
    </SafeAreaView>
  );
}
