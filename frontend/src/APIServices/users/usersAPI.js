import { BASE_URL } from "../../utils/baseEndpoint";
import axios from "axios";

// ! Register user
export const registerAPI = async (userData) => {
  const response = await axios.post(
    `${BASE_URL}/users/register`,
    {
      username: userData?.username,
      password: userData?.password,
      email: userData?.email,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};
// ! login user
// export const loginAPI = async (userData) => {
//   const response = await axios.post(
//     `${BASE_URL}/users/login`,
//     {
//       username: userData?.username,
//       password: userData?.password,
//     },
//     {
//       withCredentials: true,
//     }
//   );

//   return response.data;
// };

export const loginAPI = async (userData) => {
  const response = await axios.post(`${BASE_URL}/users/login`, {
    username: userData?.username,
    password: userData?.password,
  });

  // Store the token in localStorage for future requests
  if (response.data.token) {
    localStorage.setItem("authToken", response.data.token);
  }

  return response.data;
};


// ! checkAuthStatus user
// export const checkAuthStatusAPI = async () => {
//   const response = await axios.get(`${BASE_URL}/users/checkAuthenticated`, {
//     withCredentials: true,
//   });

//   return response.data;
// };

export const checkAuthStatusAPI = async () => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return { isAuthenticated: false, message: "No token found" };
  }

  try {
    const response = await axios.get(`${BASE_URL}/users/checkAuthenticated`, {
      headers: { Authorization: `Bearer ${token}` }, // Send JWT in the header
    });

    return response.data;
  } catch (error) {
    return { isAuthenticated: false, message: "Invalid or expired token" };
  }
};


// ! logout user
// export const logoutAPI = async (userData) => {
//   const response = await axios.post(
//     `${BASE_URL}/users/logout`,
//     {},
//     {
//       withCredentials: true,
//     }
//   );

//   return response.data;
// };

// ! logout user
export const logoutAPI = async () => {
  const response = await axios.post(
    `${BASE_URL}/users/logout`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};


// ! user profile
// export const userProfileAPI = async () => {
//   const response = await axios.get(`${BASE_URL}/users/profile`, {
//     withCredentials: true,
//   });
//   return response.data;
// };

// export default userProfileAPI;

// ! user profile
export const userProfileAPI = async () => {
  const response = await axios.get(`${BASE_URL}/users/profile`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
  return response.data;
};

export default userProfileAPI;
