import axios from "axios";

export async function signIn(userInfo) {
  const user = JSON.stringify({
    user: {
      email: `${userInfo.email}`,
      password: `${userInfo.password}`,
    },
  });
  //   const user = JSON.stringify({
  //     user: {
  //       email: `${userInfo.email}`,
  //       password: `${userInfo.password}`,
  //     },
  //   });

  //   const response = axiosInstance
  //     .post(`http://localhost:4000/login`, user, {
  //       headers: { "Content-Type": "application/json" },
  //     })
  //     .then((response) =>
  //       localStorage.setItem("jwt", response.headers.authorization)
  //     )
  //     .catch((error) => console.log(`This is the error: ${error}`));
  try {
    const response = await axios.post(`http://localhost:4000/login`, user, {
      headers: { "Content-Type": "application/json" },
    });

    localStorage.setItem("jwt", response.headers.authorization);
  } catch (error) {
    console.log(`This is the error: ${error}`);
  }
}

export default signIn;
