import HomePage from "./pages/Home/HomePage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import CategoriesPage from "./pages/Categories/CategoriesPage";

const Routes = [
  {
    path: "/",
    exact: true,
    component: HomePage
	},
	{
    path: "/categories",
    exact: true,
    component: CategoriesPage
  },
  {
    path: "*",
    exact: true,
    component: NotFoundPage
  }
];

export default Routes;
