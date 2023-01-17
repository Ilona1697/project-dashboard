import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getAccessToken, getSelectedUser } from "./services/api-user-service";
import { getSelectedCategory } from "./services/api-category-service";
import { getSelectedPost } from "./services/post-api-service";

import { AuthUser, SetSelectedUser } from "./store/action-creators/userActions";
import { SetSelectedCategory } from "./store/action-creators/categoryActions";
import { SetSelectedPost } from "./store/action-creators/postActions";

const token = getAccessToken();
if (token) {
  AuthUser(token, "Loaded from index", store.dispatch);
}

const selectedUser = getSelectedUser();
if (selectedUser) {
  SetSelectedUser(selectedUser, store.dispatch);
}

const selectedCategory = getSelectedCategory();
if (selectedCategory) {
  SetSelectedCategory(selectedCategory, store.dispatch);
}
const selectedPost = getSelectedPost();
if (selectedPost) {
  SetSelectedPost(selectedPost, store.dispatch);
}
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ToastContainer autoClose={5000} />
      <App />
    </BrowserRouter>
  </Provider>
);
