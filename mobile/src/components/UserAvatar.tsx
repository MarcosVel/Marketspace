import { Avatar, IAvatarProps, Skeleton } from "native-base";
import api from "../services/api";

type UserAvatarProps = IAvatarProps & {
  width: number;
  height: number;
  borderWidth: number;
  avatarUrl?: string;
  avatarIsLoading?: boolean;
};

export default function UserAvatar({
  width,
  height,
  borderWidth,
  avatarUrl,
  avatarIsLoading,
  ...rest
}: UserAvatarProps) {
  return avatarIsLoading ? (
    <Skeleton
      w={width}
      h={height}
      rounded="full"
      startColor="gray.300"
      endColor="gray.400"
      borderWidth={borderWidth}
      borderColor="blue.400"
    />
  ) : (
    <Avatar
      w={width}
      h={height}
      rounded="full"
      borderWidth={borderWidth}
      borderColor="blue.400"
      source={
        avatarUrl
          ? { uri: `${api.defaults.baseURL}/images/${avatarUrl}` }
          : require("../assets/emptyAvatar.png")
      }
      {...rest}
    />
  );
}
