import { Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { colors } from "../../theme/colors";

type HeaderNavProps = {
  onNavigate?: (screen: string) => void;
};

export default function HeaderNav({ onNavigate }: HeaderNavProps) {
  const { width } = useWindowDimensions();

  const isTablet = width < 1024;
  const isMobile = width < 768;

  if (isMobile) return null;

  return (
    <View style={styles.nav}>
      <View style={styles.navInner}>
        <View style={[styles.navLinks, isTablet && styles.navLinksTablet]}>
          <Pressable onPress={() => onNavigate?.("work")}>
            <Text style={[styles.navLink, isTablet && styles.navLinkTablet]}>
              Arbete och näringsliv
            </Text>
          </Pressable>

          <View style={[styles.navSep, isTablet && styles.navSepTablet]} />

          <Pressable onPress={() => onNavigate?.("living")}>
            <Text style={[styles.navLink, isTablet && styles.navLinkTablet]}>
              Boende, trafik och miljö
            </Text>
          </Pressable>

          <View style={[styles.navSep, isTablet && styles.navSepTablet]} />

          <Pressable onPress={() => onNavigate?.("school")}>
            <Text style={[styles.navLink, isTablet && styles.navLinkTablet]}>
              Skola och förskola
            </Text>
          </Pressable>

          <View style={[styles.navSep, isTablet && styles.navSepTablet]} />

          <Pressable onPress={() => onNavigate?.("care")}>
            <Text style={[styles.navLink, isTablet && styles.navLinkTablet]}>
              Stöd och omsorg
            </Text>
          </Pressable>

          <View style={[styles.navSep, isTablet && styles.navSepTablet]} />

          <Pressable onPress={() => onNavigate?.("leisure")}>
            <Text style={[styles.navLink, isTablet && styles.navLinkTablet]}>
              Se och göra
            </Text>
          </Pressable>

          <View style={[styles.navSep, isTablet && styles.navSepTablet]} />

          <Pressable onPress={() => onNavigate?.("politics")}>
            <Text style={[styles.navLink, isTablet && styles.navLinkTablet]}>
              Kommun och politik
            </Text>
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

  navLinksTablet: {
    gap: 10,
    paddingTop: 10,
    paddingRight: 12,
    paddingBottom: 10,
    paddingLeft: 12,
  },

  navLink: {
    color: colors.navDarkText,
    fontSize: 14,
    fontWeight: "800",
  },

  navLinkTablet: {
    fontSize: 12,
  },

  navSep: {
    width: 1,
    height: 18,
    backgroundColor: colors.navDarkLine,
  },

  navSepTablet: {
    height: 14,
  },
});
