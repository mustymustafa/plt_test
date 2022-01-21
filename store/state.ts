
export interface BasketState {
  id: number;
  name: string;
  colour: string;
  quantity: number;
  img: string;
  price: number;

}

const INITIAL_STATE:BasketState[] = []

export { INITIAL_STATE };
