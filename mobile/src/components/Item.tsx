import { useNavigation } from "@react-navigation/native";
import { Box, Flex, Image, Text } from "native-base";
import { Dimensions, TouchableOpacity } from "react-native";
import { AppNavigationProps } from "../routes/app.routes";
import UserAvatar from "./UserAvatar";

const { width } = Dimensions.get("window");

export default function Item() {
  const navigation = useNavigation<AppNavigationProps>();

  return (
    <TouchableOpacity
      style={{
        flexGrow: 1,
        maxWidth: width / 2 - 34,
      }}
      activeOpacity={0.6}
      onPress={() => navigation.navigate("details")}
    >
      <Box>
        <Image
          source={{ uri: "https://wallpaperaccess.com/full/317501.jpg" }}
          alt="Item"
          w="full"
          h={100}
          rounded={6}
          mb={1}
        />

        <UserAvatar
          width={6}
          height={6}
          borderWidth={1}
          borderColor="gray.100"
          position="absolute"
          top={1}
          left={1}
        />

        <Box
          rounded="full"
          bg="gray.600"
          alignItems="center"
          justifyContent="center"
          px={2}
          py={0.5}
          position="absolute"
          top={1}
          right={1}
        >
          <Text fontFamily="heading" fontSize="2xs" color="gray.100">
            USADO
          </Text>
        </Box>
      </Box>

      <Box px={1}>
        <Text
          fontFamily="body"
          color="gray.600"
          numberOfLines={1}
          lineHeight="xs"
        >
          Bicicleta
        </Text>
        <Flex flexDirection="row" alignItems="baseline">
          <Text fontFamily="heading" fontSize="xs" color="gray.700">
            R$
          </Text>
          <Text fontFamily="heading" fontSize="md" color="gray.700" ml={0.5}>
            54,90
          </Text>
        </Flex>
      </Box>
    </TouchableOpacity>
  );
}
