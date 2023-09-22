import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import {
    CategoryPage,
    ErrorPage,
    LoginPage,
    RegisterPage,
    ProductPage,
    StatsPage,
} from "./pages";
import { Root } from "./routes/root";
import { Provider } from "react-redux";
import { store } from "./store";
import { ProfilePage } from "./pages";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <StatsPage />,
            },
            {
                path: "profile",
                element: <ProfilePage />,
            },
            {
                path: "categories",
                element: <CategoryPage />,
            },
            {
                path: "products",
                element: <ProductPage />,
            },
        ],
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
