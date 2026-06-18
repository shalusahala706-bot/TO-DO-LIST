import { createBrowserRouter } from "react-router";
import Todologin from "../pages/Todologin";
import Signup from "../pages/Signup"
import Home from "../pages/home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Todologin/>
  },
  {
    path:"signup",
    element:<Signup/>
  },
  {
    path:"home",
    element:<Home/>
  }
])
export default router;