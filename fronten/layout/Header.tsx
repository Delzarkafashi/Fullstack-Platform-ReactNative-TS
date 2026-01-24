import { StyleSheet, View } from "react-native";
import { colors } from "../theme/colors";

import HeaderBrand from "../components/header/HeaderBrand";
import HeaderTools from "../components/header/HeaderTools";
import HeaderActions from "../components/header/HeaderActions";
import HeaderNav from "../components/header/HeaderNav";

type HeaderProps = {
  onNavigate?: (screen: string) => void;
};

export default function Header({ onNavigate }: HeaderProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.top}>
        <HeaderBrand onNavigate={onNavigate} />
        <HeaderTools onNavigate={onNavigate} />
        <HeaderActions onNavigate={onNavigate} />
      </View>

      <HeaderNav onNavigate={onNavigate} />
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
});
