import { IButtonProps, Button as NativeButton, Text } from "native-base";

type ButtonProps = IButtonProps & {
  title: string;
  variant?: "dark" | "blue";
};

export default function Button({ title, variant, ...rest }: ButtonProps) {
  return (
    <NativeButton
      w="full"
      p={3}
      flexShrink={1}
      bg={
        variant === "dark"
          ? "gray.700"
          : variant === "blue"
          ? "blue.400"
          : "gray.300"
      }
      rounded={6}
      _pressed={{
        bg:
          variant === "dark"
            ? "gray.600"
            : variant === "blue"
            ? "blue.800"
            : "gray.400",
      }}
      {...rest}
    >
      <Text
        fontFamily="heading"
        color={variant ? "gray.100" : "gray.600"}
        fontSize="sm"
      >
        {title}
      </Text>
    </NativeButton>
  );
}
