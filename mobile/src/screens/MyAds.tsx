import { useNavigation } from "@react-navigation/native";
import { Box, Center, Select, Text } from "native-base";
import { CaretDown, Plus } from "phosphor-react-native";
import { useLayoutEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { AuthNavigationProps } from "../routes/auth.routes";

export default function MyAds() {
  const navigation = useNavigation<AuthNavigationProps>();
  const [filter, setFilter] = useState<"all" | "actives" | "inactives">("all");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity>
          <Plus size={24} color="#1A181B" />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EDECEE" }}>
      <Center flexDirection="row" justifyContent="space-between" px={6} mt={4}>
        <Text fontFamily="body" color="gray.600">
          9 anúncios
        </Text>

        <Select
          selectedValue={filter}
          defaultValue={filter}
          minW={32}
          accessibilityLabel="Filter by"
          color="gray.700"
          fontFamily="body"
          fontSize="sm"
          _selectedItem={{
            bg: "gray.200",
            rounded: "md",
          }}
          rounded="md"
          dropdownIcon={
            <CaretDown size={16} color="#5F5B62" style={{ marginRight: 12 }} />
          }
        >
          <Select.Item label="Todos" value="all" />
          <Select.Item label="Ativos" value="actives" />
          <Select.Item label="Inativos" value="inactives" />
        </Select>
      </Center>
    </SafeAreaView>
  );
}
