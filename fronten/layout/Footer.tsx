import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

type FooterProps = {
  onNavigate?: (screen: string) => void;
};

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.topWhite}>
        <View style={styles.topInner}>
          <View style={styles.featureRow}>
            <Feature
              text="Kontakt och öppettider"
              icon="🕘"
              onPress={() => onNavigate?.("contact")}
            />
            <Divider />
            <Feature
              text="E-tjänster med BankID"
              icon="🪪"
              onPress={() => onNavigate?.("e-services")}
            />
            <Divider />
            <Feature
              text="Tillgänglighet och lättläst"
              icon="♿"
              onPress={() => onNavigate?.("accessibility")}
            />
            <Divider />
            <Feature
              text="Drift och störningar"
              icon="⚠️"
              onPress={() => onNavigate?.("status")}
            />
            <Divider />
            <Feature
              text="Kartor och besök"
              icon="🗺️"
              onPress={() => onNavigate?.("map")}
            />
          </View>
        </View>
      </View>

      <View style={styles.dark}>
        <View style={styles.colsOuter}>
          <View style={styles.colsInner}>
            <FooterCol title="Kommunen">
              <Text style={styles.centerText}>Copyright © {new Date().getFullYear()}</Text>

              <FooterLink
                label="Tillgänglighetsredogörelse"
                onPress={() => onNavigate?.("accessibility")}
              />
              <FooterLink
                label="Personuppgifter"
                onPress={() => onNavigate?.("contact")}
              />
              <FooterLink
                label="Cookies"
                onPress={() => onNavigate?.("home")}
              />
              <FooterLink
                label="Webbplatskarta"
                onPress={() => onNavigate?.("home")}
              />
            </FooterCol>

            <FooterCol title="Service">
              <FooterLink
                label="Alla e-tjänster"
                onPress={() => onNavigate?.("e-services")}
              />
              <FooterLink
                label="Felanmälan"
                onPress={() => onNavigate?.("status")}
              />
              <FooterLink
                label="Blanketter"
                onPress={() => onNavigate?.("e-services")}
              />
              <FooterLink
                label="Nyheter"
                onPress={() => onNavigate?.("home")}
              />
            </FooterCol>

            <FooterCol title="Invånare">
              <FooterLink
                label="Skola och förskola"
                onPress={() => onNavigate?.("school")}
              />
              <FooterLink
                label="Stöd och omsorg"
                onPress={() => onNavigate?.("care")}
              />
              <FooterLink
                label="Boende och miljö"
                onPress={() => onNavigate?.("living")}
              />
              <FooterLink
                label="Se och göra"
                onPress={() => onNavigate?.("leisure")}
              />
            </FooterCol>

            <FooterCol title="Kontakt">
              <Text style={styles.centerText}>Kontaktcenter</Text>
              <Text style={styles.centerText}>Telefon: 013 00 00 00</Text>
              <Text style={styles.centerText}>info@kommun.se</Text>

              <Pressable onPress={() => onNavigate?.("contact")}>
                <Text style={styles.linkStrong}>Gå till kontakt</Text>
              </Pressable>
            </FooterCol>

            <FooterCol title="Sociala medier">
              <SocialLink
                icon="📷"
                label="Instagram"
                onPress={() => onNavigate?.("menu")}
              />
              <SocialLink
                icon="📘"
                label="Facebook"
                onPress={() => onNavigate?.("menu")}
              />
              <SocialLink
                icon="▶️"
                label="YouTube"
                onPress={() => onNavigate?.("menu")}
              />
            </FooterCol>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.brandRow}>
            <Badge text="Märkning" onPress={() => onNavigate?.("home")} />
            <Badge text="Tillgänglighet" onPress={() => onNavigate?.("accessibility")} />
            <Badge text="Säkerhet" onPress={() => onNavigate?.("status")} />
        </View>

      </View>
    </View>
  );
}

function Feature({
  icon,
  text,
  onPress,
}: {
  icon: string;
  text: string;
  onPress?: () => void;
}) {
  return (
    <Pressable style={styles.feature} onPress={onPress}>
      <Text style={styles.featureIcon}>{icon}</Text>
      <Text style={styles.featureText}>{text}</Text>
    </Pressable>
  );
}

function Divider() {
  return <View style={styles.featureDivider} />;
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.col}>
      <Text style={styles.colTitle}>{title}</Text>
      {children}
    </View>
  );
}

function FooterLink({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.centerText}>{label}</Text>
    </Pressable>
  );
}

function SocialLink({
  icon,
  label,
  onPress,
}: {
  icon: string;
  label: string;
  onPress?: () => void;
}) {
  return (
    <Pressable style={styles.socialLink} onPress={onPress}>
      <Text style={styles.socialIcon}>{icon}</Text>
      <Text style={styles.socialText}>{label}</Text>
    </Pressable>
  );
}

function Badge({
  text,
  onPress,
}: {
  text: string;
  onPress?: () => void;
}) {
  return (
    <Pressable style={styles.badge} onPress={onPress}>
      <Text style={styles.badgeText}>{text}</Text>
    </Pressable>
  );
}


const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },

  topWhite: {
    paddingVertical: 18,
    backgroundColor: colors.surface,
  },

  topInner: {
    paddingHorizontal: 16,
  },

  featureRow: {
    flexDirection: "row",
  },

  feature: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
  },

  featureIcon: {
    fontSize: 22,
    marginBottom: 6,
  },

  featureText: {
    fontSize: 12,
    fontWeight: "800",
    textAlign: "center",
  },

  featureDivider: {
    width: 1,
    backgroundColor: colors.line,
  },

  dark: {
    backgroundColor: colors.navDark,
    paddingTop: 24,
  },

  colsOuter: {
    alignItems: "center",
  },

  colsInner: {
    width: "100%",
    maxWidth: 1100,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  col: {
    flex: 1,
    alignItems: "center",
  },

  colTitle: {
    color: colors.navDarkText,
    fontWeight: "900",
    marginBottom: 12,
    textAlign: "center",
  },

  centerText: {
    color: colors.navDarkText,
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },

  linkStrong: {
    color: colors.navDarkText,
    fontWeight: "900",
    marginTop: 8,
    textAlign: "center",
  },

  socialLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },

  socialIcon: {
    fontSize: 16,
  },

  socialText: {
    color: colors.navDarkText,
    fontSize: 12,
    fontWeight: "700",
  },

  divider: {
    height: 1,
    backgroundColor: colors.navDarkLine,
    marginVertical: 18,
  },

  brandRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    paddingBottom: 16,
  },

  badge: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.navDarkLine,
  },

  badgeText: {
    color: colors.navDarkText,
    fontSize: 11,
    fontWeight: "800",
  },
});
