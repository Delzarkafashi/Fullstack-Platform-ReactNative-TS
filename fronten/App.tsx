import React from "react";
import { NavigationContainer, createNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AppLayout from "./layout/AppLayout";

import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import ContactScreen from "./screens/ContactScreen";
import EServicesScreen from "./screens/EServicesScreen";
import WorkBusinessScreen from "./screens/WorkBusinessScreen";
import LivingEnvironmentScreen from "./screens/LivingEnvironmentScreen";
import SchoolScreen from "./screens/SchoolScreen";
import CareScreen from "./screens/CareScreen";
import LeisureScreen from "./screens/LeisureScreen";
import PoliticsScreen from "./screens/PoliticsScreen";
import StatusScreen from "./screens/StatusScreen";
import AccessibilityScreen from "./screens/AccessibilityScreen";
import VisitScreen from "./screens/VisitScreen";

export type RootStackParamList = {
  home: undefined;
  search: undefined;
  contact: undefined;
  "e-services": undefined;
  business: undefined;
  work: undefined;
  living: undefined;
  school: undefined;
  care: undefined;
  leisure: undefined;
  politics: undefined;
  status: undefined;
  accessibility: undefined;
  visit: undefined;
  map: undefined;
  translate: undefined;
  menu: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const navigationRef = createNavigationContainerRef<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <AppLayout
          onNavigate={(screen: string) => {
            if (navigationRef.isReady()) {
              navigationRef.navigate(screen as keyof RootStackParamList);
            }
          }}
        >
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="home">
            <Stack.Screen name="home" component={HomeScreen} />
            <Stack.Screen name="search" component={SearchScreen} />
            <Stack.Screen name="contact" component={ContactScreen} />
            <Stack.Screen name="e-services" component={EServicesScreen} />

            <Stack.Screen name="work" component={WorkBusinessScreen} />
            <Stack.Screen name="living" component={LivingEnvironmentScreen} />
            <Stack.Screen name="school" component={SchoolScreen} />
            <Stack.Screen name="care" component={CareScreen} />
            <Stack.Screen name="leisure" component={LeisureScreen} />
            <Stack.Screen name="politics" component={PoliticsScreen} />

            <Stack.Screen name="status" component={StatusScreen} />
            <Stack.Screen name="accessibility" component={AccessibilityScreen} />
            <Stack.Screen name="visit" component={VisitScreen} />

            <Stack.Screen name="business" component={WorkBusinessScreen} />
            <Stack.Screen name="map" component={VisitScreen} />
            <Stack.Screen name="translate" component={HomeScreen} />
            <Stack.Screen name="menu" component={HomeScreen} />
          </Stack.Navigator>
        </AppLayout>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
