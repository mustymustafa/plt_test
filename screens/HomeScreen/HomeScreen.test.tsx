import { addItem, store } from "../../store";

const product = {
  colour: "Black",
  id: 1,
  img: "http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024",
  name: "Black Sheet Strappy Textured Glitter Bodycon Dress",
  price: 10,
};

describe("HomeScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully add the product to the basket", () => {
    expect(store.dispatch(addItem(product))).toEqual({
      payload: {
        colour: "Black",
        id: 1,
        img: "http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024",
        name: "Black Sheet Strappy Textured Glitter Bodycon Dress",
        price: 10,
      },
      type: "basket/addItem",
    });
  });
});
