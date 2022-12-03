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
} from "react-native";

import { RootTabScreenProps } from "../../types";
import { useDispatch, useSelector } from "react-redux";

import { store, storeUsers, RootState } from "../../store";
import { getUsers } from "../../middleware/api/index";

export default function LoadingScreen({
  navigation,
}: RootTabScreenProps<"Home">) {
  const { user } = useSelector((state: RootState) => state);
  let INITIAL_QUANTITY = 1;

  const dispatch = useDispatch;
  const [isLoading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState(0);

  useEffect(() => {
    let isActive = true;
    if (isActive) {
      setUsers();
    }

    return () => {
      isActive = false;
    };
  }, []);

  const setUsers = async () => {
    const users = await getUsers();
    store.dispatch(storeUsers(users));
    if (users) navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 20, alignItems: "center", top: "50%" }}>
        <ActivityIndicator size="large" color="#000000" />
        <Text
          style={{
            fontSize: 14,
            paddingLeft: 15,
            paddingTop: 5,
            color: "black",
            fontWeight: "300",
          }}
        >
          Fetching Users..
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  products: {
    width: "50%",
    padding: 10,
  },
});
