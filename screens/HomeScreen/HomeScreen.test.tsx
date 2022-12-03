import React from "react";
import { render } from "@testing-library/react-native";

import HomeScreen from "./HomeScreen";
import { addUser, store } from "../../store";

const user = {
  id: 1,
  username: "mustymustafa",
  firstName: "musty",
  lastName: "mustafa",
  age: 24,
  image: "https://robohash.org/facilisdignissimosdolore.png",
  address: { address: "downtown", postalCode: "m25", state: "manny" },
};


describe("HomeScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully add the user to the list", () => {
    expect(store.dispatch(addUser(user))).toEqual({
      payload: {
        id: 1,
        username: "mustymustafa",
        firstName: "musty",
        lastName: "mustafa",
        age: 24,
        image: "https://robohash.org/facilisdignissimosdolore.png",
        address: { address: "downtown", postalCode: "m25", state: "manny" },
      },
      type: "user/addUser",
    });
  });
});
