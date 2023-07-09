import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

export default function Routes() {
  return (
    <NavigationContainer>
      <AuthRoutes />
      {/* <AppRoutes /> */}
    </NavigationContainer>
  );
}
