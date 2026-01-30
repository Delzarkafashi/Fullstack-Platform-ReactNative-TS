import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { colors } from "../../theme/colors";

type HeaderNavProps = {
  onNavigate?: (screen: string) => void;
};

function isActiveGroup(routeName: string, group: string) {
  if (group === "work") return routeName === "work" || routeName === "business";
  if (group === "living")
    return routeName === "living" || routeName === "status";
  if (group === "school") return routeName === "school";
  if (group === "care") return routeName === "care" || routeName === "accessibility";
  if (group === "leisure")
    return routeName === "leisure" || routeName === "visit";
  if (group === "politics") return routeName === "politics";
  return false;
}

export default function HeaderNav({ onNavigate }: HeaderNavProps) {
  const { width } = useWindowDimensions();
  const route = useRoute();

  const isTablet = width < 1024;
  const isMobile = width < 768;

  if (isMobile) return null;

  return (
    <View style={styles.nav}>
      <View style={styles.navInner}>
        <View style={[styles.navLinks, isTablet && styles.navLinksTablet]}>

          <Pressable onPress={() => onNavigate?.("work")}>
            <Text
              style={[
                styles.navLink,
                isTablet && styles.navLinkTablet,
                isActiveGroup(route.name, "work") && styles.navLinkActive,
              ]}
            >
              Arbete och näringsliv
            </Text>
          </Pressable>

          <View style={styles.navSep} />

          <Pressable onPress={() => onNavigate?.("living")}>
            <Text
              style={[
                styles.navLink,
                isTablet && styles.navLinkTablet,
                isActiveGroup(route.name, "living") && styles.navLinkActive,
              ]}
            >
              Boende, trafik och miljö
            </Text>
          </Pressable>
          <View style={styles.navSep} />

          <Pressable onPress={() => onNavigate?.("school")}>
            <Text
              style={[
                styles.navLink,
                isTablet && styles.navLinkTablet,
                isActiveGroup(route.name, "school") && styles.navLinkActive,
              ]}
            >
              Skola och förskola
            </Text>
          </Pressable>

          <View style={styles.navSep} />

          <Pressable onPress={() => onNavigate?.("care")}>
            <Text
              style={[
                styles.navLink,
                isTablet && styles.navLinkTablet,
                isActiveGroup(route.name, "care") && styles.navLinkActive,
              ]}
            >
              Stöd och omsorg
            </Text>
          </Pressable>

          <View style={styles.navSep} />

          <Pressable onPress={() => onNavigate?.("leisure")}>
            <Text
              style={[
                styles.navLink,
                isTablet && styles.navLinkTablet,
                isActiveGroup(route.name, "leisure") && styles.navLinkActive,
              ]}
            >
              Se och göra
            </Text>
          </Pressable>

          <View style={styles.navSep} />

          <Pressable onPress={() => onNavigate?.("politics")}>
            <Text
              style={[
                styles.navLink,
                isTablet && styles.navLinkTablet,
                isActiveGroup(route.name, "politics") && styles.navLinkActive,
              ]}
            >
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

  navLinkActive: {
    color: "#FFFFFF",
    textDecorationLine: "underline",
  },

  navSep: {
    width: 1,
    height: 18,
    backgroundColor: colors.navDarkLine,
  },
});
