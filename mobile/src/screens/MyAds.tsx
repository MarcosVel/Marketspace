import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Center, FlatList, Select, Text } from "native-base";
import { CaretDown, Plus } from "phosphor-react-native";
import { useCallback, useLayoutEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import Item from "../components/Item";
import Loading from "../components/Loading";
import { AppNavigationProps } from "../routes/app.routes";
import api from "../services/api";

export default function MyAds() {
  const navigation = useNavigation<AppNavigationProps>();
  const [filter, setFilter] = useState<"all" | "actives" | "inactives">(
    "all"
  ); /** @todo implement filter */
  const [isLoading, setIsLoading] = useState(false);
  const [myAds, setMyAds] = useState([]);
  const [allMyAds, setAllMyAds] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("createAd")}>
          <Plus size={24} color="#1A181B" />
        </TouchableOpacity>
      ),
    });
  }, []);

  async function fetchMyAds() {
    try {
      setIsLoading(true);

      const response = await api.get("/users/products");

      setMyAds(response.data);
      setAllMyAds(response.data);
    } catch (error) {
      console.log("error on fetchMyAds:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleFilter(type: string) {
    setFilter(type as "all" | "actives" | "inactives");

    if (type === "actives") {
      setMyAds(allMyAds.filter((items) => items.is_active === true));
    } else if (type === "inactives") {
      setMyAds(allMyAds.filter((items) => items.is_active === false));
    } else {
      setMyAds(allMyAds);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchMyAds();
    }, [])
  );

  console.log("myAds:", myAds);

  const ListHeader = () => (
    <Center
      flexDirection="row"
      justifyContent="space-between"
      pt={4}
      bg="gray.200"
    >
      <Text fontFamily="body" color="gray.600">
        {myAds.length} anúncio(s)
      </Text>

      <Select
        selectedValue={filter}
        defaultValue={filter}
        onValueChange={(selected) => handleFilter(selected)}
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
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={myAds}
          renderItem={({ item }) => <Item data={item} />}
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
          ListEmptyComponent={() => (
            <Text color="gray.500">Você ainda não possui nenhum anúncio.</Text>
          )}
        />
      )}
    </SafeAreaView>
  );
}
