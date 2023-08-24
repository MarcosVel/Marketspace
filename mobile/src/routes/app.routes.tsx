import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { House, SignOut, Tag } from "phosphor-react-native";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import CreateAd from "../screens/CreateAd";
import Details from "../screens/Details";
import Home from "../screens/Home";
import MyAds from "../screens/MyAds";
import PrePublishAd from "../screens/PrePublishAd";

type AppRoutes = {
  details: { product_id: string; user_id: string };
  createAd: undefined;
  myAds: undefined;
  prePublish: {
    product_images: {
      name: string;
      uri: string;
      type: string;
    }[];
    name: string;
    description: string;
    is_new: string;
    price: number;
    accept_trade: boolean;
    payment_methods: string[];
  };
};

export type AppNavigationProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function SignOutButton() {
  return null;
}

function TabRoutes() {
  const { signOut } = useContext(AuthContext);

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#1A181B",
        tabBarInactiveTintColor: "#9F9BA1",
        headerTitleStyle: {
          fontFamily: "Karla_700Bold",
          fontSize: 20,
          color: "#1A181B",
        },
        headerStyle: {
          backgroundColor: "#EDECEE",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleAlign: "center",
      }}
    >
      <Screen
        name="home"
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
        name="myAds"
        component={MyAds}
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <Tag color={color} size={size} weight="bold" />
            ) : (
              <Tag color={color} size={size} />
            ),
          headerTitle: "Meus anúncios",
          headerShown: true,
          // headerRight: () => <Plus size={24} color="#1A181B" />, -> inside useLayoutEffect
          headerRightContainerStyle: {
            right: 24,
          },
        }}
      />
      <Screen
        name="SignOut"
        component={SignOutButton}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            signOut();
          },
        })}
        options={{
          tabBarIcon: ({ size }) => <SignOut color="#EE7979" size={size} />,
        }}
      />
    </Navigator>
  );
}

export function AppRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: "#EDECEE",
        },
        headerTitleStyle: {
          fontFamily: "Karla_700Bold",
          fontSize: 20,
          color: "#1A181B",
        },
        headerShadowVisible: false, // border bottom
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="TabRoutes" component={TabRoutes} />
      <Stack.Screen name="details" component={Details} />
      <Stack.Screen name="createAd" component={CreateAd} />
      <Stack.Screen name="prePublish" component={PrePublishAd} />
    </Stack.Navigator>
  );
}
