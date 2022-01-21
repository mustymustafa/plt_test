import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import { Alert } from "react-native";
import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { INITIAL_STATE, BasketState } from "./state";

import { RootTabScreenProps } from "../types";
import { BasketIdPayload } from "./types";
const middlewares = [
  /* other middlewares */
  thunk,
];

if (__DEV__) {
  const createDebugger = require("redux-flipper").default;
  middlewares.push(createDebugger());
}

const basketSlice = createSlice({
  name: "basket",
  initialState: INITIAL_STATE,
  reducers: {
    //action to add item to the basket
    addItem: (state, { payload: { id, name, img, price, colour } }) => {
      state.push({
        id,
        name,
        img,
        price,
        quantity: 1,
        colour,
      });
      return Alert.alert("Item added");
    },

    //action to remove item to the basket
    removeItem: (
      state,
      { payload: { id } }: PayloadAction<BasketIdPayload>
    ) => {
      state.splice(
        state.findIndex((item) => item.id === id),
        1
      );
    },

    //action to increment an item in the basket
    increaseItemQuantity: (
      state,
      { payload: { id } }: PayloadAction<BasketIdPayload>
    ) => {
      //Find index of specific item to locate and increment the item.
      const itemIndex = state.findIndex((item) => item.id === id);

      state[itemIndex].quantity += 1;
    },

    //action to decrease an item in the basket
    decreaseItemQuantity: (
      state,
      { payload: { id } }: PayloadAction<BasketIdPayload>
    ) => {
      //Find index of specific item to locate and decrement the item.
      const itemIndex = state.findIndex((item) => item.id === id);

      state[itemIndex].quantity -= 1;
    },
  },
});
//export the action here
export const {
  addItem,
  removeItem,
  increaseItemQuantity,
  decreaseItemQuantity,
} = basketSlice.actions;

//combine store
const rootReducer = combineReducers({
  basket: basketSlice.reducer,
});

//cretae store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;

export { store };
