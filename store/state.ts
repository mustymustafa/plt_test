export interface UserState {
  id?: number;
  username: string;
  firstName: string;
  lastName: string;
  maidenName?: string;
  age: number;
  image: string;
  address: {
    address: string;
    postalCode: string;
    state: string;
  };
}

const INITIAL_STATE: UserState[] = [];

export { INITIAL_STATE };
