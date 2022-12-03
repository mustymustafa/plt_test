const BASE_URL = "https://dummyjson.com/users";

export const getUsers = async () => {
  try {
    const fetchUsers = await fetch(BASE_URL, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });
    const value = await fetchUsers.json();
    if (fetchUsers.ok) {
      return value.users;
    } else {
      alert("an error occurred");
    }
  } catch (error) {
    return alert("an error occurred");
    //console.log(error.toString());
  }
};
