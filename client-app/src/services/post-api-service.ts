import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/Post",
  headers: {
    "Content-Type": "application/json",
  },
});

const responseBody: any = (response: any) => response.data;

const requests = {
  get: (url: string) => instance.get(url).then().then(responseBody),
  post: (url: string, body?: any) =>
    instance.post(url, body).then().then(responseBody),
  put: (url: string, body?: any) =>
    instance.put(url, body).then().then(responseBody),
  delete: (url: string) =>
    instance.delete(url).then().then(responseBody),
};

const Post = {
  getAllPosts: () => requests.get(`/getAllPosts`),
  createPost: (newPost: any) => requests.post(`/createPost`, newPost),
  editPost: (newPost: any) => requests.put(`/updatePost`, newPost),
  deletePost: (id: number) => requests.delete(`/deletePost/${id}`),
};

export async function getAllPosts() {
  const data = await Post.getAllPosts()
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
export async function updatePost(newPost: any) {
  const data = await Post.editPost(newPost)
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
export async function deletePost(newPost: any) {
  const id = newPost.id;
  const data = await Post.deletePost(id)
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
export async function createPost(newPost: any) {
  const data = await Post.createPost(newPost)
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

export function getSelectedPost() {
  let selectedPost: any = window.localStorage.getItem("selectedPost");
  selectedPost = JSON.parse(selectedPost);
  return selectedPost;
}
export function setSelectedPost(post: any) {
  post = JSON.stringify(post);
  window.localStorage.setItem("selectedPost", post);
}
export function removeSelectedPost() {
  window.localStorage.removeItem("selectedPost");
}