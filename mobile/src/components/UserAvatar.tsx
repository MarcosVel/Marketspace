import { Image } from "native-base";

type UserAvatarProps = {
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
}: UserAvatarProps) {
  return (
    <Image
      w={width}
      h={height}
      rounded="full"
      borderWidth={borderWidth}
      borderColor="blue.400"
      alt="User avatar"
      source={
        avatarUrl ? { uri: avatarUrl } : require("../assets/emptyAvatar.png")
      }
      defaultSource={require("../assets/emptyAvatar.png")}
      resizeMode="contain"
    />
  );
}
