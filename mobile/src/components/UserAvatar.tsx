import { Avatar, IAvatarProps } from "native-base";

type UserAvatarProps = IAvatarProps & {
  width: number;
  height: number;
  borderWidth: number;
  avatarUrl?: string;
};

export default function UserAvatar({
  width,
  height,
  borderWidth,
  avatarUrl,
  ...rest
}: UserAvatarProps) {
  return (
    <Avatar
      w={width}
      h={height}
      rounded="full"
      borderWidth={borderWidth}
      borderColor="blue.400"
      source={
        avatarUrl ? { uri: avatarUrl } : require("../assets/emptyAvatar.png")
      }
      {...rest}
    />
  );
}
