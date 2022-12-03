import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import { Alert } from "react-native";
import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { INITIAL_STATE } from "./state";
import { UserNamePayload, User } from "./types";

const middlewares = [
  /* other middlewares */
  thunk,
];

if (__DEV__) {
  const createDebugger = require("redux-flipper").default;
  middlewares.push(createDebugger());
}

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    //action to fetch and store users
    storeUsers: (state, action: PayloadAction<User>) => {
      state.push(action.payload);
    },

    addUser: (state, action: PayloadAction<User>) => {
      //unshift is used her to add the user to the beginning of the stack
      state.map((users) => users.unshift(action.payload));
      return Alert.alert("User added");
    },

    //action to remove user
    removeItem: (
      state,
      { payload: { username } }: PayloadAction<UserNamePayload>
    ) => {
      state.map((users) =>
        users.splice(
          state.findIndex((item) => item.username === username),
          1
        )
      );
    },
  },
});
//export the action here
export const { storeUsers, addUser, removeItem } = userSlice.actions;

//combine store
const rootReducer = combineReducers({
  user: userSlice.reducer,
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
