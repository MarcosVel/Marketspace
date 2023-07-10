import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import Loading from "../components/Loading";
import { AuthContext } from "../contexts/AuthContext";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export default function Routes() {
  const { user, isLoadingUser } = React.useContext(AuthContext);

  if (isLoadingUser) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {user.id ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
