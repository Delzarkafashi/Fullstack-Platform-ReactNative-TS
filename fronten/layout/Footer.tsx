import React from "react";
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { colors } from "../theme/colors";

type FooterProps = {
  onNavigate?: (screen: string) => void;
};

export default function Footer({ onNavigate }: FooterProps) {
  const { width } = useWindowDimensions();
  const isTablet = width < 1024;
  const isMobile = width < 768;

  const colsCount = isMobile ? 2 : isTablet ? 3 : 5;

  return (
    <View style={styles.wrapper}>
      <View style={styles.topWhite}>
        <View style={styles.topInner}>
          <View style={[styles.featureRow, isTablet && styles.featureRowWrap]}>
            <Feature
              text="Kontakt och öppettider"
              icon="🕘"
              onPress={() => onNavigate?.("contact")}
              compact={isMobile}
            />

            <Divider hide={isTablet} />

            <Feature
              text="E-tjänster med BankID"
              icon="🪪"
              onPress={() => onNavigate?.("e-services")}
              compact={isMobile}
            />

            <Divider hide={isTablet} />

            <Feature
              text="Tillgänglighet och lättläst"
              icon="♿"
              onPress={() => onNavigate?.("accessibility")}
              compact={isMobile}
            />

            <Divider hide={isTablet} />

            <Feature
              text="Drift och störningar"
              icon="⚠️"
              onPress={() => onNavigate?.("status")}
              compact={isMobile}
            />

            <Divider hide={isTablet} />

            <Feature
              text="Kartor och besök"
              icon="🗺️"
              onPress={() => onNavigate?.("map")}
              compact={isMobile}
            />
          </View>
        </View>
      </View>

      <View style={styles.dark}>
        <View style={styles.colsOuter}>
          <View style={[styles.colsInner, isTablet && styles.colsInnerWrap]}>
            <FooterCol title="Kommunen" colsCount={colsCount}>
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

            <FooterCol title="Service" colsCount={colsCount}>
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

            <FooterCol title="Invånare" colsCount={colsCount}>
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

            <FooterCol title="Kontakt" colsCount={colsCount}>
              <Text style={styles.centerText}>Kontaktcenter</Text>
              <Text style={styles.centerText}>Telefon: 013 00 00 00</Text>
              <Text style={styles.centerText}>info@kommun.se</Text>

              <Pressable onPress={() => onNavigate?.("contact")}>
                <Text style={styles.linkStrong}>Gå till kontakt</Text>
              </Pressable>
            </FooterCol>

            <FooterCol title="Sociala medier" colsCount={colsCount}>
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

        <View style={[styles.brandRow, isMobile && styles.brandRowWrap]}>
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
  compact,
}: {
  icon: string;
  text: string;
  onPress?: () => void;
  compact?: boolean;
}) {
  return (
    <Pressable style={[styles.feature, compact && styles.featureCompact]} onPress={onPress}>
      <Text style={[styles.featureIcon, compact && styles.featureIconCompact]}>{icon}</Text>
      <Text style={[styles.featureText, compact && styles.featureTextCompact]}>{text}</Text>
    </Pressable>
  );
}

function Divider({ hide }: { hide?: boolean }) {
  if (hide) return null;
  return <View style={styles.featureDivider} />;
}

function FooterCol({
  title,
  children,
  colsCount,
}: {
  title: string;
  children: React.ReactNode;
  colsCount: number;
}) {
  return (
    <View style={[styles.col, { width: `${100 / colsCount}%` }]}>
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

  featureRowWrap: {
    flexWrap: "wrap",
  },

  feature: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
  },

  featureCompact: {
    flexBasis: "50%",
    paddingVertical: 14,
  },

  featureIcon: {
    fontSize: 22,
    marginBottom: 6,
  },

  featureIconCompact: {
    fontSize: 20,
  },

  featureText: {
    fontSize: 12,
    fontWeight: "800",
    textAlign: "center",
  },

  featureTextCompact: {
    fontSize: 11,
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

  colsInnerWrap: {
    flexWrap: "wrap",
    justifyContent: "flex-start",
    rowGap: 18,
  },

  col: {
    alignItems: "center",
    paddingHorizontal: 8,
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

  brandRowWrap: {
    flexWrap: "wrap",
    rowGap: 12,
    paddingLeft: 16,
    paddingRight: 16,
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
