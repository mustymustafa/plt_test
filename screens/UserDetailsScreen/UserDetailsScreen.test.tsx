import React from 'react';
import {render} from '@testing-library/react-native'

import  UserDetailsScreen  from "./UserDetailsScreen";


const user = {
  id: 1,
  username: "mustymustafa",
  firstName: "musty",
  lastName: "mustafa",
  age: 24,
  image: "https://robohash.org/facilisdignissimosdolore.png",
  address: { address: "downtown", postalCode: "m25", state: "manny" },
};

const route = { params: { user: user } };


describe("User Details Screen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully render User Details screen", () => {
   const {queryByTestId} = render(<UserDetailsScreen route={route} />)
   expect(queryByTestId("userDetailsView")).toBeTruthy()
  });
});