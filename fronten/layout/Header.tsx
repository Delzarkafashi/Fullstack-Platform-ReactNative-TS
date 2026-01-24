import { StyleSheet, View, useWindowDimensions } from "react-native";
import { colors } from "../theme/colors";

import HeaderBrand from "../components/header/HeaderBrand";
import HeaderTools from "../components/header/HeaderTools";
import HeaderActions from "../components/header/HeaderActions";
import HeaderNav from "../components/header/HeaderNav";

type HeaderProps = {
  onNavigate?: (screen: string) => void;
  onMenuOpen?: () => void;
};

export default function Header({ onNavigate, onMenuOpen }: HeaderProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  return (
    <View style={styles.wrapper}>
      <View style={[styles.top, isMobile && styles.topMobile, isTablet && styles.topTablet]}>
        <HeaderBrand onNavigate={onNavigate} compact={isMobile} />
        {!isMobile ? <HeaderTools onNavigate={onNavigate} /> : null}
        <HeaderActions onNavigate={onNavigate} onMenuOpen={onMenuOpen} compact={isMobile} />
      </View>

      {!isMobile ? <HeaderNav onNavigate={onNavigate} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },

  top: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 14,
    paddingRight: 16,
    paddingBottom: 14,
    paddingLeft: 16,
    backgroundColor: colors.surface,
  },

  topTablet: {
    paddingTop: 12,
    paddingBottom: 12,
  },

  topMobile: {
    paddingTop: 10,
    paddingRight: 12,
    paddingBottom: 10,
    paddingLeft: 12,
  },
});
