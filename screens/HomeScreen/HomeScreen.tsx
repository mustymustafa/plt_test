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

import { Product } from "../types";
import { store, addItem, increaseItemQuantity, RootState } from "../../store";

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  const { basket } = useSelector((state: RootState) => state);
  let INITIAL_QUANTITY = 1;

  const dispatch = useDispatch;
  const [isLoading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState(0);

  useEffect(() => {
    let isActive = true;
    if (isActive) {
      getProducts();
    }

    return () => {
      isActive = false;
    };
  }, []);

  const getProducts = async () => {
    try {
      setLoading(true);
      const fetchProducts = await fetch(
        "https://my-json-server.typicode.com/benirvingplt/products/products",
        {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        }
      );
      const value = await fetchProducts.json();
      console.log("value", value);
      if (fetchProducts.ok) {
        setProducts(value);
        setLoading(false);
      } else {
        setLoading(false);
        alert("an error occurred");
      }
    } catch (error) {
      //console.log(error.toString());
    }
  };

  const addItemToBasket = (product: Product) => {
    //Increase product quantity if product is already in basket. This is to prevent duplications

    //Check the basket to see if item exists already
    const itemIndex = basket.findIndex((item) => item.id === product.id);

    if (itemIndex > -1) {
      store.dispatch(increaseItemQuantity({ id: product.id }));
      alert("Item updated");
      return;
    }
    store.dispatch(addItem(product));
  };

  const renderItem = ({ item }: { item: Product }) => {
    return (
      <Pressable
        style={styles.products}
        onPress={() =>
          addItemToBasket({
            id: item.id,
            name: item.name,
            colour: item.colour,
            price: item.price,
            img: item.img,
            quantity: INITIAL_QUANTITY,
          })
        }
      >
        <Image
          source={{ uri: `${item.img}` }}
          style={{ height: 300, width: 180 }}
        />
        <View>
          <Text
            style={{
              fontSize: 14,
              paddingLeft: 15,
              paddingTop: 5,
              color: "black",
              fontWeight: "bold",
            }}
          >
            £{item.price}
          </Text>

          <Text
            style={{
              fontSize: 14,
              paddingLeft: 15,
              paddingTop: 5,
              color: "black",
              fontWeight: "300",
            }}
          >
            {item.name}
          </Text>

          <Text
            style={{
              fontSize: 14,
              paddingLeft: 15,
              paddingTop: 10,

              color: "black",
            }}
          >
            Colour: {item.colour}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={{ padding: 20, alignItems: "center", top: "50%" }}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      ) : (
        <View style={{ top: 20 }}>
          <View style={{ bottom: 20, height: 20, alignItems: "center" }}>
            <Text
              style={{
                fontSize: 14,
                paddingLeft: 15,
                padding: 5,
                top: 10,
                color: "black",
                fontWeight: "300",
              }}
            >
              {products.length} items found
            </Text>
          </View>
          <FlatList
            numColumns={2}
            key={selectedId}
            data={products}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
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
