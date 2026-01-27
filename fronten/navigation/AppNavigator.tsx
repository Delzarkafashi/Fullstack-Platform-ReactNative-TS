import React from "react";
import { createNavigationContainerRef, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppLayout from "../layout/AppLayout";

import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import ContactScreen from "../screens/ContactScreen";
import EServicesScreen from "../screens/EServicesScreen";
import WorkBusinessScreen from "../screens/WorkBusinessScreen";
import LivingEnvironmentScreen from "../screens/LivingEnvironmentScreen";
import SchoolScreen from "../screens/SchoolScreen";
import CareScreen from "../screens/CareScreen";
import LeisureScreen from "../screens/LeisureScreen";
import PoliticsScreen from "../screens/PoliticsScreen";
import StatusScreen from "../screens/StatusScreen";
import AccessibilityScreen from "../screens/AccessibilityScreen";
import VisitScreen from "../screens/VisitScreen";

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

  politics: { slug?: string } | undefined;

  status: undefined;
  accessibility: undefined;
  visit: undefined;
  map: undefined;
  translate: undefined;
  menu: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

function withLayout(Screen: React.ComponentType<any>) {
  return function WrappedScreen(props: any) {
    return (
      <AppLayout
        onNavigate={(screen: string) => {
          if (navigationRef.isReady()) {
            navigationRef.navigate(screen as keyof RootStackParamList);
          }
        }}
      >
        <Screen {...props} />
      </AppLayout>
    );
  };
}

export default function AppNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="home">
        <Stack.Screen name="home" component={withLayout(HomeScreen)} />
        <Stack.Screen name="search" component={withLayout(SearchScreen)} />
        <Stack.Screen name="contact" component={withLayout(ContactScreen)} />
        <Stack.Screen name="e-services" component={withLayout(EServicesScreen)} />

        <Stack.Screen name="work" component={withLayout(WorkBusinessScreen)} />
        <Stack.Screen name="living" component={withLayout(LivingEnvironmentScreen)} />
        <Stack.Screen name="school" component={withLayout(SchoolScreen)} />
        <Stack.Screen name="care" component={withLayout(CareScreen)} />
        <Stack.Screen name="leisure" component={withLayout(LeisureScreen)} />
        <Stack.Screen name="politics" component={withLayout(PoliticsScreen)} />

        <Stack.Screen name="status" component={withLayout(StatusScreen)} />
        <Stack.Screen name="accessibility" component={withLayout(AccessibilityScreen)} />
        <Stack.Screen name="visit" component={withLayout(VisitScreen)} />

        <Stack.Screen name="business" component={withLayout(WorkBusinessScreen)} />
        <Stack.Screen name="map" component={withLayout(VisitScreen)} />
        <Stack.Screen name="translate" component={withLayout(HomeScreen)} />
        <Stack.Screen name="menu" component={withLayout(HomeScreen)} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
