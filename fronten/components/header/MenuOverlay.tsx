import React, { useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
} from "react-native";
import { colors } from "../../theme/colors";

type MenuLink = {
  label: string;
  screen: string;
};

type MenuSection = {
  id: string;
  title: string;
  links: MenuLink[];
};

type MenuOverlayProps = {
  visible: boolean;
  onClose: () => void;
  onNavigate?: (screen: string) => void;
};


export default function MenuOverlay({ visible, onClose, onNavigate }: MenuOverlayProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const sections = useMemo<MenuSection[]>(
    () => [
      {
        id: "school",
        title: "Förskola och utbildning",
        links: [
          { label: "Förskola", screen: "school" },
          { label: "Grundskola", screen: "school" },
          { label: "Gymnasieskola", screen: "school" },
          { label: "Vuxenutbildning", screen: "school" },
        ],
      },
      {
        id: "leisure",
        title: "Uppleva och göra",
        links: [
          { label: "Fritid", screen: "leisure" },
          { label: "Besok", screen: "visit" },
          { label: "Karta", screen: "map" },
        ],
      },
      {
        id: "care",
        title: "Omsorg och stöd",
        links: [
          { label: "Omsorg", screen: "care" },
          { label: "Ekonomiskt bistånd", screen: "care" },
          { label: "Tillgänglighet", screen: "accessibility" },
        ],
      },
      {
        id: "traffic",
        title: "Stadsplanering och trafik",
        links: [
          { label: "Bo och miljö", screen: "living" },
          { label: "Status", screen: "status" },
        ],
      },
      {
        id: "living",
        title: "Bygga och bo",
        links: [
          { label: "Bo och miljö", screen: "living" },
          { label: "E tjänster", screen: "e-services" },
        ],
      },
      {
        id: "work",
        title: "Arbete och lediga jobb",
        links: [
          { label: "Arbete", screen: "work" },
          { label: "Lediga jobb", screen: "work" },
        ],
      },
      {
        id: "business",
        title: "Företag och näringsliv",
        links: [
          { label: "Företag", screen: "business" },
          { label: "Kontakt", screen: "contact" },
        ],
      },
    ],
    []
  );

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  function go(screen: string) {
    onClose();
    onNavigate?.(screen);
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <View />
      </Pressable>

      <View style={styles.sheet}>
        <View style={styles.topBar}>
          <View style={styles.topActions}>
            <Pressable style={styles.topAction} onPress={() => go("e-services")}>
            <Text style={styles.toolIcon}>🗂️</Text>
            <Text style={styles.topActionText}>E tjänster</Text>
            </Pressable>


            <Pressable style={styles.topAction} onPress={() => go("contact")}>
            <Text style={styles.toolIcon}>👤</Text>
            <Text style={styles.topActionText}>Kontakt</Text>
            </Pressable>


            <Pressable style={styles.topAction} onPress={() => go("business")}>
            <Text style={styles.toolIcon}>🏢</Text>
            <Text style={styles.topActionText}>Företag</Text>
            </Pressable>
              </View>  


          <Pressable style={styles.closePill} onPress={onClose}>
            <Text style={styles.closeText}>Stäng</Text>
            <View style={styles.closeX}>
              <Text style={styles.closeXText}>×</Text>
            </View>
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator>
          <Text style={styles.h1}>E tjänster och blanketter</Text>

          <View style={styles.list}>
            {sections.map((section) => {
              const isOpen = openId === section.id;

              return (
                <View key={section.id} style={styles.block}>
                  <Pressable style={styles.row} onPress={() => toggle(section.id)}>
                    <Text style={styles.rowText}>{section.title}</Text>

                    <View style={styles.plusWrap}>
                      <Text style={styles.plusText}>{isOpen ? "−" : "+"}</Text>
                    </View>
                  </Pressable>

                  {isOpen ? (
                    <View style={styles.subList}>
                      {section.links.map((link) => (
                        <Pressable key={link.label + link.screen} style={styles.subRow} onPress={() => go(link.screen)}>
                          <Text style={styles.subRowText}>{link.label}</Text>
                        </Pressable>
                      ))}
                    </View>
                  ) : null}
                </View>
              );
            })}
          </View>

          <View style={styles.quickArea}>
            <Text style={styles.quickTitle}>Snabblänkar</Text>

            <View style={styles.quickGrid}>
              <Pressable style={styles.quickBtn} onPress={() => go("work")}>
                <Text style={styles.quickBtnText}>Lediga jobb</Text>
              </Pressable>

              <Pressable style={styles.quickBtn} onPress={() => go("care")}>
                <Text style={styles.quickBtnText}>Ekonomiskt bistånd</Text>
              </Pressable>

              <Pressable style={styles.quickBtn} onPress={() => go("visit")}>
                <Text style={styles.quickBtnText}>Framtidsstaden</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.bottomSpace} />
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

sheet: {
  position: "absolute",
  top: 0,
  right: 0,
  width: 360,
  maxWidth: "100%",
  maxHeight: "100%",
  backgroundColor: "#FFFFFF",
},



  topBar: {
    backgroundColor: "#0A6D7C",
    paddingTop: 16,
    paddingRight: 14,
    paddingBottom: 14,
    paddingLeft: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  topActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  topAction: {
    alignItems: "center",
    gap: 6,
  },

  topActionText: {
    color: "#EAF7FA",
    fontWeight: "800",
    fontSize: 14,
  },

  iconDot: {
    width: 18,
    height: 18,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#EAF7FA",
    backgroundColor: "rgba(255,255,255,0.10)",
  },

  toolIcon: {
    fontSize: 22,
  },


  closePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingTop: 10,
    paddingRight: 12,
    paddingBottom: 10,
    paddingLeft: 14,
    borderRadius: 999,
    backgroundColor: "#CFE8EE",
  },

  closeText: {
    color: "#063F49",
    fontWeight: "900",
  },

  closeX: {
    width: 24,
    height: 24,
    borderRadius: 999,
    backgroundColor: "#E8F4F7",
    alignItems: "center",
    justifyContent: "center",
  },

  closeXText: {
    color: "#063F49",
    fontSize: 18,
    fontWeight: "900",
    marginTop: -2,
  },

  content: {
    paddingTop: 16,
    paddingRight: 14,
    paddingBottom: 18,
    paddingLeft: 14,
  },

  h1: {
    color: "#0B2F38",
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 12,
  },

  list: {
    gap: 10,
  },

  block: {
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(11,47,56,0.12)",
    backgroundColor: "#FFFFFF",
  },

  row: {
    minHeight: 58,
    paddingTop: 14,
    paddingRight: 14,
    paddingBottom: 14,
    paddingLeft: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    backgroundColor: "#FFFFFF",
  },

  rowText: {
    color: "#0B2F38",
    fontWeight: "900",
    fontSize: 16,
    flexShrink: 1,
  },

  plusWrap: {
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: "#CFE8EE",
    alignItems: "center",
    justifyContent: "center",
  },

  plusText: {
    color: "#0B2F38",
    fontSize: 26,
    fontWeight: "900",
    marginTop: -2,
  },

  subList: {
    paddingTop: 6,
    paddingRight: 14,
    paddingBottom: 12,
    paddingLeft: 14,
    backgroundColor: "#F2F7F9",
    gap: 8,
  },

  subRow: {
    paddingTop: 14,
    paddingRight: 12,
    paddingBottom: 14,
    paddingLeft: 12,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(11,47,56,0.10)",
  },

  subRowText: {
    color: "#0B2F38",
    fontWeight: "800",
  },

  quickArea: {
    marginTop: 18,
    paddingTop: 14,
    paddingRight: 14,
    paddingBottom: 14,
    paddingLeft: 14,
    borderRadius: 14,
    backgroundColor: "#F2F7F9",
    borderWidth: 1,
    borderColor: "rgba(11,47,56,0.10)",
  },

  quickTitle: {
    color: "#0B2F38",
    fontWeight: "900",
    marginBottom: 12,
  },

  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  quickBtn: {
    paddingTop: 12,
    paddingRight: 14,
    paddingBottom: 12,
    paddingLeft: 14,
    borderRadius: 10,
    backgroundColor: "#0A6D7C",
  },

  quickBtnText: {
    color: "#FFFFFF",
    fontWeight: "900",
  },

  bottomSpace: {
    height: 28,
  },
});
