import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet, View } from "react-native";
import { ReactNode, useState } from "react";
import { colors } from "../theme/colors";
import Header from "./Header";
import Footer from "./Footer";
import MenuOverlay from "../components/header/MenuOverlay";

type AppLayoutProps = {
  children: ReactNode;
  onNavigate: (screen: string) => void;
};

export default function AppLayout({ children, onNavigate }: AppLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <Header
        onNavigate={onNavigate}
        onMenuOpen={() => setMenuOpen(true)}
      />

      <MenuOverlay
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={(screen) => {
          setMenuOpen(false);
          onNavigate(screen);
        }}
      />

      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.main}>{children}</View>
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
