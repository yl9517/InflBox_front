import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";

const AppRoutes = () => {
  return (
    <Routes>
      {routes.map((route) => {
        const Element = route.element;
        return (
          <Route key={route.path} path={route.path} element={<Element />} />
        );
      })}
    </Routes>
  );
};

export default AppRoutes;
