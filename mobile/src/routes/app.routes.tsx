import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { House, SignOut, Tag } from "phosphor-react-native";
import Home from "../screens/Home";
import MyAds from "../screens/MyAds";

const { Navigator, Screen } = createBottomTabNavigator();

function SignOutButton() {
  return null;
}

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#1A181B",
        tabBarInactiveTintColor: "#9F9BA1",
      }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <House color={color} size={size} weight="bold" />
            ) : (
              <House color={color} size={size} />
            ),
        }}
      />
      <Screen
        name="MyAds"
        component={MyAds}
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <Tag color={color} size={size} weight="bold" />
            ) : (
              <Tag color={color} size={size} />
            ),
        }}
      />
      <Screen
        name="SignOut"
        component={SignOutButton}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            console.log("SignOut");
          },
        })}
        options={{
          tabBarIcon: ({ size }) => <SignOut color="#EE7979" size={size} />,
        }}
      />
    </Navigator>
  );
}
