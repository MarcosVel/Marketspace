import { useNavigation } from "@react-navigation/native";
import { Box, Flex, Image, Text } from "native-base";
import { useContext } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { AppNavigationProps } from "../routes/app.routes";
import api from "../services/api";
import UserAvatar from "./UserAvatar";

const { width } = Dimensions.get("window");

type ItemProps = {
  data: {
    product_images: [
      {
        path: string;
      }
    ];
    name: string;
    description: string;
    is_new: boolean;
    price: number;
    accept_trade: boolean;
    payment_methods: string[];
    is_active: boolean;
  };
};

export default function Item({ data }: ItemProps) {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation<AppNavigationProps>();

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        flexGrow: 1,
        maxWidth: width / 2 - 34,
      }}
      activeOpacity={0.6}
      onPress={() => navigation.navigate("details")}
    >
      <Box>
        <Image
          source={{
            uri: `${api.defaults.baseURL}/images/${data.product_images[0].path}`,
          }}
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
          avatarUrl={user.avatar}
        />

        <Box
          rounded="full"
          bg={data.is_new ? "blue.800" : "gray.600"}
          alignItems="center"
          justifyContent="center"
          px={2}
          py={0.5}
          position="absolute"
          top={1}
          right={1}
        >
          <Text fontFamily="heading" fontSize="2xs" color="gray.100">
            {data.is_new ? "NOVO" : "USADO"}
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
          {data.name}
        </Text>
        <Flex flexDirection="row" alignItems="baseline">
          <Text fontFamily="heading" fontSize="xs" color="gray.700">
            R$
          </Text>
          <Text fontFamily="heading" fontSize="md" color="gray.700" ml={0.5}>
            {data.price.toFixed(2).replace(".", ",")}
          </Text>
        </Flex>
      </Box>
    </TouchableOpacity>
  );
}
