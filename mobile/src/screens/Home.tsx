import { Box, Text } from "native-base";
import { SafeAreaView } from "react-native";

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box>
        <Text>Home</Text>
      </Box>
    </SafeAreaView>
  );
}
