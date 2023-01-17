import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/Category",
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
};

const Category = {
  GetAllCategories: () => requests.get(`/allCategories`),
  UpdateCategory: (name: any) => requests.post(`/updateCategory`, name),
  CreateCategory: (category: any) => requests.post(`/createCategory`, category),
  DeleteCategory: (id: any) => requests.delete(`/deleteCategory/` + id),
};

export async function createCategory(category: any) {
  const data = await Category.CreateCategory(category)
    .then((response: any) => {
      const { Message, IsSuccess, IsAuth, Errors, Token, Payload } = response;
      return {
        Message,
        IsSuccess,
        IsAuth,
        Errors,
        Token,
        Payload,
      };
    })
    .catch((error: any) => {
      return error.response.data;
    });
  return data;
}

export async function updateCategory(name: any) {
  const data = await Category.UpdateCategory(name)
    .then((response: any) => {
      const { Message, IsSuccess, IsAuth, Errors, Token, Payload } = response;
      return {
        Message,
        IsSuccess,
        IsAuth,
        Errors,
        Token,
        Payload,
      };
    })
    .catch((error: any) => {
      return error.response.data;
    });
  return data;
}
export async function deleteCategory(id: Number) {
  const data = await Category.DeleteCategory(id)
    .then((response: any) => {
      const { Message, IsSuccess, IsAuth, Errors, Token, Payload } = response;
      return {
        Message,
        IsSuccess,
        IsAuth,
        Errors,
        Token,
        Payload,
      };
    })
    .catch((error: any) => {
      return error.response.data;
    });
  return data;
}
export async function getAllCategories() {
  const data = await Category.GetAllCategories()
    .then((response: any) => {
      const { Message, IsSuccess, IsAuth, Errors, Token, Payload } = response;
      return {
        Message,
        IsSuccess,
        IsAuth,
        Errors,
        Token,
        Payload,
      };
    })
    .catch((error: any) => {
      return error.response.data;
    });
  return data;
}

export function setSelectedCategory(category: any) {
  category = JSON.stringify(category);
  window.localStorage.setItem("selectedCategory", category);
}

export function getSelectedCategory() {
  let selectedCategory: any = window.localStorage.getItem("selectedCategory");
  selectedCategory = JSON.parse(selectedCategory);
  return selectedCategory;
}

export function removeSelectedCategory() {
  window.localStorage.removeItem("selectedCategory");
}
