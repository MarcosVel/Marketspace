import {
  FormControl,
  IInputProps,
  Input as NativeBaseInput,
} from "native-base";

type Props = IInputProps & {
  errorMessage?: string | null;
};

export default function Input({ errorMessage, mb, ...rest }: Props) {
  return (
    <FormControl isInvalid={!!errorMessage} mb={mb}>
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

      <FormControl.ErrorMessage _text={{ color: "red.400" }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
