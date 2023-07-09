import "react-native-gesture-handler";
import {
  Karla_400Regular,
  Karla_700Bold,
  useFonts,
} from "@expo-google-fonts/karla";
import { NativeBaseProvider } from "native-base";
import { StatusBar } from "react-native";
import Loading from "./src/components/Loading";
import Routes from "./src/routes";
import { THEME } from "./src/theme";
import { AuthContextProvider } from "./src/contexts/AuthContext";

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });

  return (
    <AuthContextProvider>
      <NativeBaseProvider theme={THEME}>
        <StatusBar barStyle="dark-content" backgroundColor="#EDECEE" />
        {fontsLoaded ? <Routes /> : <Loading />}
      </NativeBaseProvider>
    </AuthContextProvider>
  );
}
