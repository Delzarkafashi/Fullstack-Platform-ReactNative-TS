import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { ReactNode } from "react";
import { colors } from "../theme/colors";
import Header from "./Header";
import Footer from "./Footer";

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <SafeAreaView style={styles.safe}>
      <Header />

      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.main}>
          {children}
        </View>

        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  page: {
    flexGrow: 1,
    backgroundColor: colors.surface,
  },

  main: {
    flex: 1,
    padding: 16,
  },
});
