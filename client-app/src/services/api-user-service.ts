import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/User",
  headers: {
    "Content-Type": "application/json",
  },
});

const responseBody: any = (response: any) => response.data;

const requests = {
  get: (url: string) => instance.get(url).then().then(responseBody),
  post: (url: string, body?: any) =>
    instance.post(url, body).then().then(responseBody),
  delete: (url: string) => instance.delete(url).then().then(responseBody),
  put: (url: string, body?: any) =>
    instance.put(url, body).then().then(responseBody),
};

const User = {
  login: (user: any) => requests.put(`/login`, user),
  getAllUsers: () => requests.get(`/users`),
  register: (user: any) => requests.post(`/register`, user),
  updateProfile: (user: any) => requests.put(`/updateProfile`, user),
  updateUser: (user: any) => requests.put(`/updateUser`, user),
  changePassword: (passwords: any) =>
    requests.put(`/changePassword`, passwords),
  deleteUser: (id: number) => requests.delete(`/deleteUser/${id}`),
  blockUser: (user: any) => requests.put(`/blockUser`, user),
};

export async function changePassword(passwords: any) {
  const data = await User.changePassword(passwords)
    .then((response: any) => {
      const { Message, IsSuccess, IsAuth, Errors, Token } = response;
      return {
        Message,
        IsSuccess,
        IsAuth,
        Errors,
        Token,
      };
    })
    .catch((error: any) => {
      return error.response.data;
    });
  return data;
}

export async function updateProfile(user: any) {
  const data = await User.updateProfile(user)
    .then((response: any) => {
      const { Message, IsSuccess, IsAuth, Errors, Token } = response;
      return {
        Message,
        IsSuccess,
        IsAuth,
        Errors,
        Token,
      };
    })
    .catch((error: any) => {
      return error.response.data;
    });
  return data;
}

export async function updateUser(user: any) {
  const data = await User.updateUser(user)
    .then((response: any) => {
      const { Message, IsSuccess, IsAuth, Errors, Token, Payload } = response;
      return {
        Message,
        IsSuccess,
        IsAuth,
        Errors,
        Token,
        Payload
      };
    })
    .catch((error: any) => {
      return error.response.data;
    });
  return data;
}
export async function blockUser(user: any) {
  const data = await User.blockUser(user)
    .then((response: any) => {
      const { Message, IsSuccess, IsAuth, Errors, Token, Payload } = response;
      return {
        Message,
        IsSuccess,
        IsAuth,
        Errors,
        Token,
        Payload
      };
    })
    .catch((error: any) => {
      return error.response.data;
    });
  return data;
}
export async function deleteUser(user: any) {
  const data = await User.deleteUser(user.id)
    .then((response: any) => {
      const { Message, IsSuccess, IsAuth, Errors, Token, Payload } = response;
      return {
        Message,
        IsSuccess,
        IsAuth,
        Errors,
        Token,
        Payload
      };
    })
    .catch((error: any) => {
      return error.response.data;
    });
  return data;
}
export async function getAllUsers() {
  const data = await User.getAllUsers()
    .then((response: any) => {
      const { Message, IsSuccess, Payload } = response;
      return {
        Message,
        IsSuccess,
        Payload,
      };
    })
    .catch((error: any) => {
      return error.response.data;
    });
  return data;
}

export async function register(user: any) {
  const data = await User.register(user)
    .then((response: any) => {
      const { Message, IsSuccess, IsAuth, Errors, Token, Payload } = response;
      return {
        Message,
        IsSuccess,
        IsAuth,
        Errors,
        Token,
        Payload
      };
    })
    .catch((error: any) => {
      return error.response.data;
    });
  return data;
}

export async function login(user: any) {
  const data = await User.login(user)
    .then((response: any) => {
      const { Message, IsSuccess, IsAuth, Errors, Token } = response;
      return {
        Message,
        IsSuccess,
        IsAuth,
        Errors,
        Token,
      };
    })
    .catch((error: any) => {
      return error.response.data;
    });
  return data;
}

export function setAccessToken(token: string) {
  window.localStorage.setItem("accessToken", token);
}

export function getAccessToken(): null | string {
  const token = window.localStorage.getItem("accessToken");
  return token;
}

export function removeAccessToken(): void {
  window.localStorage.removeItem("accessToken");
}

export function setSelectedUser(user: any) {
  user = JSON.stringify(user);
  window.localStorage.setItem("selectedUser", user);
}

export function getSelectedUser() {
  let selectedUser: any = window.localStorage.getItem("selectedUser");
  selectedUser = JSON.parse(selectedUser);
  return selectedUser;
}

export function removeSelectedUser() {
  window.localStorage.removeItem("selectedUser");
}
