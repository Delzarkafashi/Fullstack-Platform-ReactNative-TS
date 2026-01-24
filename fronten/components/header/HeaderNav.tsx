import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/colors";

type HeaderNavProps = {
  onNavigate?: (screen: string) => void;
};

export default function HeaderNav({ onNavigate }: HeaderNavProps) {
  return (
    <View style={styles.nav}>
      <View style={styles.navInner}>
        <View style={styles.navLinks}>
          <Pressable onPress={() => onNavigate?.("work")}>
            <Text style={styles.navLink}>Arbete och näringsliv</Text>
          </Pressable>

          <View style={styles.navSep} />

          <Pressable onPress={() => onNavigate?.("living")}>
            <Text style={styles.navLink}>Boende, trafik och miljö</Text>
          </Pressable>

          <View style={styles.navSep} />

          <Pressable onPress={() => onNavigate?.("school")}>
            <Text style={styles.navLink}>Skola och förskola</Text>
          </Pressable>

          <View style={styles.navSep} />

          <Pressable onPress={() => onNavigate?.("care")}>
            <Text style={styles.navLink}>Stöd och omsorg</Text>
          </Pressable>

          <View style={styles.navSep} />

          <Pressable onPress={() => onNavigate?.("leisure")}>
            <Text style={styles.navLink}>Se och göra</Text>
          </Pressable>

          <View style={styles.navSep} />

          <Pressable onPress={() => onNavigate?.("politics")}>
            <Text style={styles.navLink}>Kommun och politik</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    width: "100%",
    backgroundColor: colors.navDark,
  },

  navInner: {
    width: "100%",
  },

  navLinks: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 18,
    paddingTop: 12,
    paddingRight: 16,
    paddingBottom: 12,
    paddingLeft: 16,
  },

  navLink: {
    color: colors.navDarkText,
    fontSize: 14,
    fontWeight: "800",
  },

  navSep: {
    width: 1,
    height: 18,
    backgroundColor: colors.navDarkLine,
  },
});
