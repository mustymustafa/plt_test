import configureMockStore from "redux-mock-store";
import { Alert } from "react-native";
import thunk from "redux-thunk";
import { addItem, store, increaseItemQuantity } from "../../store";
import { render, cleanup } from "react-native-testing-library";
import * as Redux from "react-redux";
import BasketScreen from "./BasketScreen";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

afterEach(cleanup);

describe("BasketScreen", () => {
  const mockedStore = mockStore({
    basket: [
      {
        colour: "Black",
        id: 1,
        img: "http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024",
        name: "Black Sheet Strappy Textured Glitter Bodycon Dress",
        price: 10,
        quantity: 1,
      },
      {
        colour: "Stone",
        id: 2,
        img: "https://cdn-img.prettylittlething.com/3/6/5/a/365a5d1dce6a2b77b564379b302c9d83afccf33b_cmd2051_1.jpg?imwidth=1024",
        name: "Stone Ribbed Strappy Cut Out Detail Bodycon Dress",
        price: 4,
        quantity: 1,
      },
    ],
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render items if basket is not empty", () => {
    const rendered = render(
      <Redux.Provider store={mockedStore}>
        <BasketScreen />
      </Redux.Provider>
    );
    const basketView = rendered.getByTestId("basketView");
    expect(basketView).toBeDefined();
  });
});
