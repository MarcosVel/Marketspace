import {
  Center,
  Checkbox,
  Flex,
  HStack,
  Switch,
  Text,
  VStack,
} from "native-base";
import { X, XCircle } from "phosphor-react-native";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { Modalize } from "react-native-modalize";
import Button from "./Button";

type FilterProps = {
  modalizeRef: React.RefObject<Modalize>;
  control: any;
  handleSubmit: any;
  getValues: any;
  handleProductFilter: any;
  handleFilterReset: any;
};

export default function Filter({
  modalizeRef,
  control,
  handleSubmit,
  getValues,
  handleProductFilter,
  handleFilterReset,
}: FilterProps) {
  const [isNew, setIsNew] = useState(getValues("is_new"));

  return (
    <Modalize
      ref={modalizeRef}
      adjustToContentHeight
      handlePosition="inside"
      modalStyle={{
        backgroundColor: "#EDECEE",
        paddingTop: 48,
        paddingHorizontal: 24,
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
      }}
    >
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        mb={6}
      >
        <Text fontFamily="heading" fontSize="lg" color="gray.700">
          Filtrar anúncios
        </Text>

        <TouchableOpacity onPress={() => modalizeRef.current?.close()}>
          <X size={24} color="#9F9BA1" />
        </TouchableOpacity>
      </Flex>

      <Text fontFamily="heading" color="gray.600" mb={3}>
        Condição
      </Text>
      <HStack flexDirection="row" alignItems="center" space={2} mb={6}>
        <Controller
          control={control}
          name="is_new"
          render={({ field: { onChange } }) => (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 6,
                backgroundColor: isNew ? "#647AC7" : "#D9D8DA",
                borderRadius: 99,
                paddingHorizontal: 16,
                paddingVertical: 6,
                paddingRight: isNew ? 6 : 16,
              }}
              onPress={() => {
                setIsNew(!isNew);
                onChange(!isNew);
              }}
              activeOpacity={0.6}
            >
              <Text
                fontFamily="heading"
                fontSize="xs"
                color={isNew ? "white" : "gray.500"}
              >
                NOVO
              </Text>
              {isNew && <XCircle size={16} color="#F7F7F8" weight="fill" />}
            </TouchableOpacity>
          )}
        />

        <Controller
          control={control}
          name="is_new"
          render={({ field: { onChange } }) => (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 6,
                backgroundColor: !isNew ? "#647AC7" : "#D9D8DA",
                borderRadius: 99,
                paddingHorizontal: 16,
                paddingVertical: 6,
                paddingRight: !isNew ? 6 : 16,
              }}
              onPress={() => {
                setIsNew(!isNew);
                onChange(!isNew);
              }}
              activeOpacity={0.6}
            >
              <Text
                fontFamily="heading"
                fontSize="xs"
                color={!isNew ? "white" : "gray.500"}
              >
                USADO
              </Text>
              {!isNew && <XCircle size={16} color="#F7F7F8" weight="fill" />}
            </TouchableOpacity>
          )}
        />
      </HStack>

      <Text fontFamily="heading" color="gray.600" mb={3}>
        Aceita troca?
      </Text>
      <Controller
        control={control}
        name="accept_trade"
        render={({ field: { onChange, value } }) => (
          <Switch
            size="md"
            offTrackColor="gray.300"
            onTrackColor="blue.400"
            mb={6}
            value={value}
            onToggle={onChange}
          />
        )}
      />

      <Text fontFamily="heading" color="gray.600" mb={3}>
        Meios de pagamento aceitos
      </Text>
      <VStack space={2} mb={16}>
        <Controller
          control={control}
          name="payment_methods"
          render={({ field: { onChange, value } }) => (
            <Checkbox.Group onChange={onChange} value={value}>
              <Checkbox
                value="boleto"
                defaultIsChecked
                _checked={{
                  bg: "blue.400",
                  borderColor: "blue.400",
                }}
                borderColor="gray.300"
              >
                <Text fontFamily="body" fontSize="md" color="gray.600">
                  Boleto
                </Text>
              </Checkbox>

              <Checkbox
                value="pix"
                defaultIsChecked
                _checked={{
                  bg: "blue.400",
                  borderColor: "blue.400",
                }}
                borderColor="gray.300"
              >
                <Text fontFamily="body" fontSize="md" color="gray.600">
                  Pix
                </Text>
              </Checkbox>

              <Checkbox
                value="cash"
                defaultIsChecked
                _checked={{
                  bg: "blue.400",
                  borderColor: "blue.400",
                }}
                borderColor="gray.300"
              >
                <Text fontFamily="body" fontSize="md" color="gray.600">
                  Dinheiro
                </Text>
              </Checkbox>

              <Checkbox
                value="card"
                defaultIsChecked
                _checked={{
                  bg: "blue.400",
                  borderColor: "blue.400",
                }}
                borderColor="gray.300"
              >
                <Text fontFamily="body" fontSize="md" color="gray.600">
                  Cartão de Crédito
                </Text>
              </Checkbox>

              <Checkbox
                value="deposit"
                defaultIsChecked
                _checked={{
                  bg: "blue.400",
                  borderColor: "blue.400",
                }}
                borderColor="gray.300"
              >
                <Text fontFamily="body" fontSize="md" color="gray.600">
                  Depósito Bancário
                </Text>
              </Checkbox>
            </Checkbox.Group>
          )}
        />
      </VStack>

      <Center flexDirection="row" style={{ gap: 12 }} mb={8}>
        <Button title="Resetar filtros" onPress={() => handleFilterReset()} />
        <Button
          title="Aplicar filtros"
          variant="dark"
          onPress={handleSubmit(handleProductFilter)}
        />
      </Center>
    </Modalize>
  );
}
