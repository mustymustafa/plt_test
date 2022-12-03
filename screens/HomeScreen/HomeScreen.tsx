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
import { AntDesign } from "@expo/vector-icons";
import { User } from "../types";
import { store, RootState, removeItem } from "../../store";
import AddUserModal from "../../components/Modals/AddUser";

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  const { user } = useSelector((state: RootState) => state);
  const user_data = user[0];
  const dispatch = useDispatch;

  const [selectedId, setSelectedId] = useState(0);
  const [displayModal, setDisplayModal] = useState(false);

  const viewUser = (user: User) => {
    navigation.navigate("Details", { user: user });
  };

  const displayAddUserModal = () => {
    setDisplayModal(true);
  };

  const removeUser = (username: string) => {
    store.dispatch(removeItem(username));
  };

  const renderItem = ({ item }: { item: User }) => {
    return (
      <View
        style={{
          borderWidth: 0.2,
          borderRadius: 6,
          padding: 10,
          alignContent: "center",
        }}
      >
        <AntDesign
          onPress={() => removeUser(item.username)}
          name="close"
          size={30}
          style={{ top: "2%", alignSelf: "flex-end", paddingRight: 20 }}
        />
        <Pressable onPress={() => viewUser(item)} style={styles.products}>
          <Image
            source={{ uri: `${item.image.trim()}` }}
            style={{ height: 200, width: 160 }}
          />
        </Pressable>
        <View>
          <Text
            style={{
              fontSize: 14,
              paddingLeft: 15,
              paddingTop: 5,
              color: "black",
              fontWeight: "300",
            }}
          >
            {item.username}, {item.age}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ top: -20 }}>
        <View style={{ bottom: 20, height: 20, alignItems: "center" }}></View>
        <FlatList
          numColumns={2}
          key={selectedId}
          data={user_data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />

        <TouchableOpacity
          onPress={displayAddUserModal}
          style={{
            backgroundColor: "purple",
            position: "absolute",
            width: 200,
            height: 50,
            borderRadius: 6,
            alignItems: "center",
            bottom: 30,
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 14,
              padding: 15,
              color: "white",
            }}
          >
            Add
          </Text>
        </TouchableOpacity>
      </View>
      <AddUserModal
        shown={displayModal}
        close={() => {
          setDisplayModal(false);
        }}
      />
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
