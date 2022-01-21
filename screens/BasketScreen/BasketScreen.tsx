import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  FlatList,
} from "react-native";

import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

import { RootTabScreenProps } from "../../types";
import {
  store,
  RootState,
  removeItem,
  decreaseItemQuantity,
  increaseItemQuantity,
} from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { Product } from "../types";

export default function BasketScreen({
  navigation,
}: RootTabScreenProps<"Basket">) {
  const { basket } = useSelector((state: RootState) => state);

  const [selectedId, setSelectedId] = useState(0);

  const removeItemToBasket = (id: number) => {
    store.dispatch(removeItem({ id }));
  };

  const incrementItemQuantity = (id: number) => {
    store.dispatch(increaseItemQuantity({ id }));
  };

  const decrementItemQuantity = (id: number, quantity: number) => {
    //If quantity is zero remove item from element
    if (quantity == 0) {
      store.dispatch(removeItem({ id }));
      return;
    }
    store.dispatch(decreaseItemQuantity({ id }));
  };

  const renderItem = ({ item }: { item: Product }) => {
    return (
      <View style={{ top: "3%", alignItems: "center" }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            width: "100%",
            height: "15%",
            alignSelf: "center",

            borderBottomWidth: 1,

            borderColor: "#BEBEBE",
            padding: 15,
          }}
        >
          <Image
            style={{
              flex: 4,
              padding: 10,
              width: 80,
              height: 200,
              //alignSelf: "center",
              borderRadius: 6,
              borderWidth: 0.3,
              borderColor: "#BEBEBE",
            }}
            source={{ uri: `${item.img}` }}
          />

          <View
            style={{
              flex: 8,
            }}
          >
            <Text
              style={{
                fontWeight: "300",
                fontSize: 14,
                paddingLeft: 15,
                color: "black",
              }}
            >
              {item.name}
            </Text>

            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                paddingLeft: 15,
                paddingTop: 10,
                color: "black",
              }}
            >
              £{item.price}
            </Text>

            <Text
              style={{
                fontSize: 14,
                paddingLeft: 15,
                paddingTop: 15,

                color: "black",
              }}
            >
              colour: {item.colour}
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                top: "10%",
                padding: 5,
                //alignSelf: "flex-start",
                //left: -55,
              }}
            >
              <Pressable
                onPress={() => decrementItemQuantity(item.id, item.quantity)}
                style={{ height: 80 }}
              >
                <FontAwesome5
                  name="minus-circle"
                  color="gray"
                  size={18}
                  style={{ padding: 5, top: 15 }}
                />
              </Pressable>
              <Text
                style={{
                  fontSize: 14,
                  padding: 5,
                  top: 16,

                  color: "black",
                }}
              >
                {item.quantity}
              </Text>
              <Pressable onPress={() => incrementItemQuantity(item.id)}>
                <FontAwesome5
                  name="plus-circle"
                  color="black"
                  size={18}
                  style={{ padding: 5, top: 15 }}
                />
              </Pressable>
              <Pressable onPress={() => removeItemToBasket(item.id)}>
                <FontAwesome5
                  name="trash"
                  color="black"
                  size={18}
                  style={{
                    padding: 5,
                    top: 15,
                    left: 10,
                  }}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.father}>
      {basket.length === 0 ? (
        <View style={{ padding: 20, alignItems: "center", top: "50%" }}>
          <Text>Basket is empty</Text>
        </View>
      ) : (
        <View style={{ padding: 20, top: "5%" }} testID={"basketView"}>
          <FlatList
            key={selectedId}
            data={basket}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  father: {
    flex: 1,
    backgroundColor: "white",
  },
});
