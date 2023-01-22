import { Routes, Route } from "react-router-dom";
import { useTypedSelector } from "./hooks/useTypedSelector";
// Import components
import Login from "./pages/auth/login";
import DashboardLayout from "./containers/dashboardLayout";
import NotFound from "./pages/notFound";
import Users from "./pages/users/allUsers";
import DefaultPage from "./pages/defaultPage";
import Register from "./pages/auth/register";
import Profile from "./pages/auth/profile";
import UserDetails from "./pages/users/userDetails";
import Categories from "./pages/categories/allCategories";
import CategoryDetails from "./pages/categories/categoryDetails";
import NewCategory from "./pages/categories/newCategory";
import GetAllPosts from "./pages/posts/allPosts";
import PostDetails from "./pages/posts/postDetails";
import NewPost from "./pages/posts/newPost";
import EditPost from "./pages/posts/editPost";

const App: React.FC = () => {
  const { isAuth, user } = useTypedSelector((store) => store.UserReducer);


  return (
    <Routes>
      {isAuth && (
        <>
          {user.Role === "Administrator" && (
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DefaultPage />} />
              <Route path="users" element={<Users />} />
              <Route path="register" element={<Register />} />
              <Route path="profile" element={<Profile />} />
              <Route path="userDetails" element={<UserDetails />} />
              <Route path="categories" element={<Categories />} />
              <Route path="categories/:id" element={<CategoryDetails />} />
              <Route path="newCategory" element={<NewCategory />} />
              <Route path="allPosts" element={<GetAllPosts />} />
              <Route path="myPosts" element={<GetAllPosts />} />
              <Route path="postDetails" element={<PostDetails />} />
              <Route path="newPost" element={<NewPost />} />
              <Route path="editPost" element={<EditPost />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          )}
          {user.Role === "User" && (
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DefaultPage />} />
              <Route path="profile" element={<Profile />} />
              <Route path="categories" element={<Categories />} />
              <Route path="categories/:id" element={<CategoryDetails />} />
              <Route path="newCategory" element={<NewCategory />} />
              <Route path="allPosts" element={<GetAllPosts />} />
              <Route path="myPosts" element={<GetAllPosts />} />
              <Route path="postDetails" element={<PostDetails />} />
              <Route path="newPost" element={<NewPost />} />
              <Route path="editPost" element={<EditPost />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          )}
        </>
      )}
      <Route path="/" element={<Login />} />
      <Route path="/dashboard/*" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
