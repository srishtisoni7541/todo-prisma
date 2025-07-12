import API from "../lib/axios";


interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
}
interface loginData {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  const res = await API.post("/users/register", data);
  return res.data;
};
export const loginUser = async (data: loginData) => {
  const res = await API.post("/users/login", data);
  return res.data;
};

export const getProfile = async (token: string) => {
  const res = await API.get("/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(res.data);
  return res.data;
};

export const LogoutUser = async(token:string)=>{
 const res = await API.get("/users/logout", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(res.data);
  return res.data;
}
