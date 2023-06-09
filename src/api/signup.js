import axios from "axios";

export async function createUser(userInfo) {
  const newUser = JSON.stringify({
    user: {
      email: `${userInfo.email}`,
      password: `${userInfo.password}`,
      firstname: `${userInfo.firstname}`,
      lastname: `${userInfo.lastname}`,
      dob: `${userInfo.dob}`,
      height: `${userInfo.height}`,
      weight: `${userInfo.weight}`,
      sex: `${userInfo.sex}`,
      activity_level: `${parseInt(userInfo.activity_level, 10)}`,
    },
  });

  //   try {
  //     const response = await axios.post("login", newUser);
  //     console.log(response);
  //     const { token } = response.data;
  //     localStorage.setItem("jwt", token);
  //   } catch (error) {
  //     console.error("Log in error:", error);
  //   }

  //   const response = axios
  //     .post(`http://localhost:4000/signup`, newUser, {
  //       headers: { "Content-Type": "application/json" },
  //     })
  //     .then((response) => console.log("response on axios instance", response))
  //     .catch((error) => console.log(`This is the error: ${error}`));

  try {
    const response = await axios.post(`http://localhost:4000/signup`, newUser, {
      headers: { "Content-Type": "application/json" },
    });

    localStorage.setItem("jwt", response.headers.authorization);
  } catch (error) {
    console.log(`This is the error: ${error}`);
  }
}

export default createUser;
