// import { View, Text, Image, StyleSheet, Pressable } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { colors } from "../theme/colors";

// type Props = {
//   id: number;
//   title: string;
//   excerpt: string;
//   imageUrl?: string;
//   category: string;
//   offline?: boolean;
// };

// export default function ArticleCard({
//   id,
//   title,
//   excerpt,
//   imageUrl,
//   category,
//   offline,
// }: Props) {
//   const navigation = useNavigation<any>();

//   return (
//     <Pressable
//       style={styles.card}
//       disabled={offline}
//       onPress={() => navigation.navigate("politics")}
//     >
//       {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}

//       <View style={styles.content}>
//         <Text style={styles.category}>{category}</Text>
//         <Text style={styles.title}>{title}</Text>
//         <Text style={styles.excerpt} numberOfLines={3}>
//           {excerpt}
//         </Text>

//         {offline && (
//           <Text style={styles.offline}>Ingen anslutning till servern</Text>
//         )}
//       </View>
//     </Pressable>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 0,
//     overflow: "hidden",
//     width: "33.3333%",
//     paddingTop: 0,
//     paddingRight: 12,
//     paddingBottom: 24,
//     paddingLeft: 12,
//   },
//   offline: {
//     color: "red",
//     fontSize: 12,
//     marginTop: 6,
//   },
//   image: {
//     width: "100%",
//     height: 150,
//   },
//   content: {
//     paddingTop: 10,
//     paddingRight: 0,
//     paddingBottom: 0,
//     paddingLeft: 0,
//   },
//   category: {
//     fontSize: 12,
//     color: colors.muted,
//     marginBottom: 6,
//     textTransform: "uppercase",
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: "800",
//     marginBottom: 6,
//     color: colors.fg,
//   },
//   excerpt: {
//     fontSize: 13,
//     color: colors.muted,
//     lineHeight: 18,
//   },
// });
