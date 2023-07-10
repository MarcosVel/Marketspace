import {
  Karla_400Regular,
  Karla_700Bold,
  useFonts,
} from "@expo-google-fonts/karla";
import { NativeBaseProvider } from "native-base";
import { StatusBar } from "react-native";
import "react-native-gesture-handler";
import Loading from "./src/components/Loading";
import { AuthContextProvider } from "./src/contexts/AuthContext";
import Routes from "./src/routes";
import { THEME } from "./src/theme";

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar barStyle="dark-content" backgroundColor="#EDECEE" />
      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
