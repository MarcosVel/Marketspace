import { useNavigation } from "@react-navigation/native";
import { Box, Flex, Image, Text, View } from "native-base";
import { useContext } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { AppNavigationProps } from "../routes/app.routes";
import api from "../services/api";
import UserAvatar from "./UserAvatar";

const { width } = Dimensions.get("window");

type ItemProps = {
  data: {
    id: string;
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
    user: {
      avatar: string;
    };
    is_active: boolean;
    user_id: string;
  };
  homeItem?: boolean;
};

export default function Item({ data, homeItem }: ItemProps) {
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
      onPress={() =>
        navigation.navigate("details", {
          product_id: data.id,
          user_id: data.user_id,
        })
      }
    >
      <Box>
        {homeItem ||
          (!data.is_active && (
            <View
              w="full"
              h={100}
              bg="rgba(26, 24, 27, 0.6)" // gray.700
              position="absolute"
              zIndex={99}
              justifyContent="flex-end"
              rounded={6}
              p={2}
            >
              <Text fontFamily="heading" fontSize="xs" color="white">
                ANÚNCIO DESATIVADO
              </Text>
            </View>
          ))}
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
          avatarUrl={homeItem ? data.user.avatar : user.avatar}
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
          color={homeItem || data.is_active ? "gray.600" : "gray.400"}
          numberOfLines={1}
          lineHeight="xs"
        >
          {data.name}
        </Text>
        <Flex flexDirection="row" alignItems="baseline">
          <Text
            fontFamily="heading"
            fontSize="xs"
            color={homeItem || data.is_active ? "gray.700" : "gray.400"}
          >
            R$
          </Text>
          <Text
            fontFamily="heading"
            fontSize="md"
            color={homeItem || data.is_active ? "gray.700" : "gray.400"}
            ml={0.5}
          >
            {data.price.toFixed(2).replace(".", ",")}
          </Text>
        </Flex>
      </Box>
    </TouchableOpacity>
  );
}
