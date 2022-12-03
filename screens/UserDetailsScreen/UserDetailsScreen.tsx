import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  ActivityIndicator,
  Modal,
  View,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  FlatList,
  Image,
  Dimensions,
} from "react-native";

import { RootTabScreenProps } from "../../types";

export default function UserDetailsScreen({
  navigation,
  route,
}: RootTabScreenProps<"Home">) {
  const { user } = route.params;
  return (
    <SafeAreaView style={styles.father}>
      <View style={{ padding: 20, top: "10%" }} testID={"userDetailsView"}>
        <Image
          style={styles.circle}
          source={{ uri: `${user.image}` }}
        />

        <View style={{ alignSelf: "center", top: "20%" }}>
          <Text
            style={{
              fontWeight: "300",
              fontSize: 18,
              paddingLeft: 15,
              color: "white",
              padding: 5,
              fontWeight: "800",
            }}
          >
            {user.firstName} {user.lastName}
          </Text>

          <Text
            style={{
              fontWeight: "300",
              fontSize: 14,
              paddingLeft: 15,
              color: "white",
            }}
          >
            {user.age}
          </Text>

          <Text
            style={{
              fontWeight: "300",
              fontSize: 14,
              paddingLeft: 15,
              color: "white",
            }}
          >
            {user.address.address}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  father: {
    flex: 1,
    backgroundColor: "purple",
  },
  circle: {
    backgroundColor: "yellow",
    alignSelf: "center",
    height: Dimensions.get("window").height * 0.2,
    width: Dimensions.get("window").height * 0.2,
    borderRadius: Math.round(
      (Dimensions.get("window").height + Dimensions.get("window").width) / 2
    ),
  },
});
