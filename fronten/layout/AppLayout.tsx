import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet, View } from "react-native";
import { ReactNode } from "react";
import { colors } from "../theme/colors";
import Header from "./Header";
import Footer from "./Footer";

type AppLayoutProps = {
  children: ReactNode;
  onNavigate: (screen: string) => void;
};

export default function AppLayout({ children, onNavigate }: AppLayoutProps) {
  return (
    <SafeAreaView style={styles.safe}>
      <Header onNavigate={onNavigate} />

      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.main}>
          {children}
        </View>

        <Footer onNavigate={onNavigate} />
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
