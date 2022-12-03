export interface UserNamePayload {
  username: string;
}

export interface User {
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
