import {
  FormControl,
  IInputProps,
  Input as NativeBaseInput,
} from "native-base";

type Props = IInputProps & {
  errorMessages?: string | null;
};

export default function Input({ errorMessages, mb, ...rest }: Props) {
  return (
    <FormControl isInvalid={!!errorMessages} mb={mb}>
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
        {errorMessages}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
