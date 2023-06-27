import { useNavigation } from "@react-navigation/native";
import { Center, FlatList, Select, Text } from "native-base";
import { CaretDown, Plus } from "phosphor-react-native";
import { useLayoutEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import Item from "../components/Item";

export default function MyAds() {
  const navigation = useNavigation();
  const [filter, setFilter] = useState<"all" | "actives" | "inactives">("all");
  const list = Array(5).fill(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity>
          <Plus size={24} color="#1A181B" />
        </TouchableOpacity>
      ),
    });
  }, []);

  const ListHeader = () => (
    <Center
      flexDirection="row"
      justifyContent="space-between"
      pt={4}
      bg="gray.200"
    >
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
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EDECEE" }}>
      <FlatList
        data={list}
        renderItem={({ item }) => <Item />}
        numColumns={2}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: 36,
          gap: 24,
        }}
        columnWrapperStyle={{
          gap: 20,
        }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeader}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
      />
    </SafeAreaView>
  );
}
