import { IInputProps, Input as NativeBaseInput } from "native-base";

export default function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput
      h={45}
      px={4}
      py={3}
      bg="gray.100"
      rounded={6}
      borderWidth={0}
      fontSize="md"
      fontFamily="body"
      placeholderTextColor="gray.400"
      color="gray.600"
      _focus={{
        bg: "gray.100",
      }}
      {...rest}
    />
  );
}
