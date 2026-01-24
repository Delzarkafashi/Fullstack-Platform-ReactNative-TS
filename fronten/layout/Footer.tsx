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
            <Feature text="Kontakt och öppettider" icon="🕘" />
            <Divider />
            <Feature text="E-tjänster med BankID" icon="🪪" />
            <Divider />
            <Feature text="Tillgänglighet och lättläst" icon="♿" />
            <Divider />
            <Feature text="Drift och störningar" icon="⚠️" />
            <Divider />
            <Feature text="Kartor och besök" icon="🗺️" />
          </View>
        </View>
      </View>

      <View style={styles.dark}>
        <View style={styles.colsOuter}>
          <View style={styles.colsInner}>

            <FooterCol title="Kommunen">
              <Text style={styles.centerText}>Copyright © {new Date().getFullYear()}</Text>
              <FooterLink label="Tillgänglighetsredogörelse" />
              <FooterLink label="Personuppgifter" />
              <FooterLink label="Cookies" />
              <FooterLink label="Webbplatskarta" />
            </FooterCol>

            <FooterCol title="Service">
              <FooterLink label="Alla e-tjänster" />
              <FooterLink label="Felanmälan" />
              <FooterLink label="Blanketter" />
              <FooterLink label="Nyheter" />
            </FooterCol>

            <FooterCol title="Invånare">
              <FooterLink label="Skola och förskola" />
              <FooterLink label="Stöd och omsorg" />
              <FooterLink label="Boende och miljö" />
              <FooterLink label="Se och göra" />
            </FooterCol>

            <FooterCol title="Kontakt">
              <Text style={styles.centerText}>Kontaktcenter</Text>
              <Text style={styles.centerText}>Telefon: 013 00 00 00</Text>
              <Text style={styles.centerText}>info@kommun.se</Text>
              <Text style={styles.linkStrong}>Gå till kontakt</Text>
            </FooterCol>

            <FooterCol title="Sociala medier">
              <SocialLink icon="📷" label="Instagram" />
              <SocialLink icon="📘" label="Facebook" />
              <SocialLink icon="▶️" label="YouTube" />
            </FooterCol>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.brandRow}>
          <Badge text="Märkning" />
          <Badge text="Tillgänglighet" />
          <Badge text="Säkerhet" />
        </View>
      </View>
    </View>
  );
}


function Feature({ icon, text }: { icon: string; text: string }) {
  return (
    <View style={styles.feature}>
      <Text style={styles.featureIcon}>{icon}</Text>
      <Text style={styles.featureText}>{text}</Text>
    </View>
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

function FooterLink({ label }: { label: string }) {
  return <Text style={styles.centerText}>{label}</Text>;
}

function SocialLink({ icon, label }: { icon: string; label: string }) {
  return (
    <Pressable style={styles.socialLink}>
      <Text style={styles.socialIcon}>{icon}</Text>
      <Text style={styles.socialText}>{label}</Text>
    </Pressable>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{text}</Text>
    </View>
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
