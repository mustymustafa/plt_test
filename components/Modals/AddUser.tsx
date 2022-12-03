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
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import { store, RootState, addUser } from "../../store";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface AddUserModalProps {
  shown: boolean;
  close: Function;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  shown,
  close,
}: AddUserModalProps) => {
  const { user } = useSelector((state: RootState) => state);
  
  const [firstName, setFname] = useState("");
  const [lastName, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  const [image, setImage] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostcode] = useState("");
  const [state, setState] = useState("");

  const addUserToState = () => {
    if (!username || !firstName || !lastName || !age || !image || !address)
      return alert("please fill all details");
    const new_user = {
      username,
      firstName,
      lastName,
      age,
      image,
      address: { address, postalCode, state },
    };
    store.dispatch(addUser(new_user));
    close();
  };

  return (
    <Modal animationType={"slide"} transparent={true} visible={shown}>
      <View style={{ backgroundColor: "rgba(0,0,0,0.8)" }}>
        <TouchableOpacity
          style={{
            height: "15%",
            backgroundColor: "black",
            width: 400,
          }}
          onPress={() => {
            close();
          }}
        />
        <KeyboardAwareScrollView
          scrollToOverflowEnabled={true}
          enableAutomaticScroll={true}
          enableOnAndroid={true}
          style={{
            backgroundColor: "#ffffff",
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            height: "90%",
            // height: (550),
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              height: "90%",
              width: "100%",
              top: "2%",
              borderRadius: 20,
            }}
          >
            <AntDesign
              onPress={() => close()}
              name="arrowleft"
              size={30}
              style={{ top: "2%", left: 15 }}
            />

            <Text
              style={{
                color: "#000E28",
                fontSize: 25,
                padding: 20,
                top: 10,
              }}
            >
              Add a new user
            </Text>

            <View style={{ top: "-4%" }}>
              <View style={{ top: 10, flex: 1, flexDirection: "row" }}>
                <View style={{ padding: 15, flex: 6 }}>
                  <TextInput
                    autoCorrect={false}
                    onChangeText={(e) => setFname(e)}
                    style={styles.TextInput3}
                    autoCapitalize="none"
                    placeholder="first name"
                    placeholderTextColor={"gray"}
                  />
                </View>

                <View style={{ padding: 15, flex: 6 }}>
                  <TextInput
                    autoCorrect={false}
                    onChangeText={(e) => setLname(e)}
                    style={styles.TextInput3}
                    autoCapitalize="none"
                    placeholder="last name"
                    placeholderTextColor={"gray"}
                  />
                </View>
              </View>

              <TextInput
                autoCorrect={false}
                onChangeText={(e) => setUsername(e)}
                style={styles.TextInput3}
                autoCapitalize="none"
                placeholder="username"
                placeholderTextColor={"gray"}
              />

              <TextInput
                autoCorrect={false}
                onChangeText={(e) => setAge(e)}
                style={styles.TextInput3}
                autoCapitalize="none"
                keyboardType="numeric"
                placeholder="age"
                placeholderTextColor={"gray"}
              />
              <TextInput
                autoCorrect={false}
                onChangeText={(e) => setImage(e)}
                style={styles.TextInput3}
                autoCapitalize="none"
                placeholder="Image url"
                placeholderTextColor={"gray"}
              />
              <TextInput
                autoCorrect={false}
                onChangeText={(e) => setAddress(e)}
                style={styles.TextInput3}
                autoCapitalize="none"
                placeholder="address"
                placeholderTextColor={"gray"}
              />
              <TextInput
                autoCorrect={false}
                onChangeText={(e) => setPostcode(e)}
                style={styles.TextInput3}
                autoCapitalize="none"
                placeholder="postcode"
                placeholderTextColor={"gray"}
              />
              <TextInput
                autoCorrect={false}
                onChangeText={(e) => setState(e)}
                style={styles.TextInput3}
                autoCapitalize="none"
                placeholder="state"
                placeholderTextColor={"gray"}
              />
            </View>

            <TouchableOpacity
              onPress={addUserToState}
              style={{
                backgroundColor: "purple",
                width: 150,
                height: 50,
                borderRadius: 20,

                top: "5%",
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
                Add user
              </Text>
            </TouchableOpacity>
          </View>
          {/** To fix scroll to bottom issue */}
          <Text style={{ fontSize: 80, color: "transparent" }}>
            Framework around?
          </Text>
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  );
};

export default AddUserModal;
const styles = StyleSheet.create({
  TextInput: {
    borderBottomColor: "#0C2F73",
    borderBottomWidth: 1,
    width: "85%",
    height: "65%",
    padding: 5,
    alignSelf: "center",
    color: "#0C2F73",
  },

  TextInput2: {
    borderBottomColor: "#0C2F73",
    borderBottomWidth: 1,
    width: "40%",
    height: 40,
    padding: 5,
    alignSelf: "center",
  },
  TextInput3: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "90%",
    height: 55,
    padding: 5,
    alignSelf: "center",
  },
});
