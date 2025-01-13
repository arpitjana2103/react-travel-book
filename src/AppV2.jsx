import "./global.css";
import LoginPage from "./pages/LoginPage";
import AppPage from "./pages/AppPage";
import ProductPage from "./pages/ProductPage";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";

import {
    BrowserRouter,
    createBrowserRouter,
    Navigate,
    Route,
    RouterProvider,
    Routes,
} from "react-router";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import { useEffect, useReducer, useState } from "react";
import { getCities } from "./services/apiCities";

const AppRoutesV1 = function ({ loadCities, cities }) {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="product" element={<ProductPage />} />
                <Route path="login" element={<LoginPage />} />

                <Route path="app" element={<AppPage />}>
                    <Route index element={<Navigate replace to="cities" />} />
                    <Route
                        path="cities"
                        element={
                            <CityList loadCities={loadCities} cities={cities} />
                        }
                    />
                    <Route path="countries" element={<CountryList />} />
                </Route>

                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    );
};

const AppRoutesV2 = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/product", element: <ProductPage /> },
    { path: "/login", element: <LoginPage /> },
    {
        path: "/app",
        element: <AppPage />,
        children: [
            { index: true, element: <Navigate replace to="cities" /> },
            { path: "cities", element: <CityList /> },
            { path: "counties", element: <CountryList /> },
        ],
    },
    { path: "*", element: <ErrorPage /> },
]);

///////////////////////////////////////////////////////////
//////////////////// USE REDUCER //////////////////////////
///////////////////////////////////////////////////////////

const initialState = {
    cities: [],
    loading: false,
    error: null,
};

function reducer(currState, action) {
    switch (action.type) {
        case "loading":
            return { ...currState, isLoading: true };

        case "cities/loaded":
            return { ...currState, isLoading: false, cities: action.payload };

        case "rejected":
            return { ...currState, isLoading: false, error: action.payload };
    }
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { cities, loading, error } = state;

    // handeller function
    async function loadCities() {
        try {
            dispatch({ type: "loading" });
            const citiesData = await getCities();
            dispatch({ type: "cities/loaded", payload: citiesData });
        } catch (error) {
            dispatch({ type: "rejected", payload: error.message });
        }
    }

    return <AppRoutesV1 loadCities={loadCities} cities={cities} />;
    // return <RouterProvider router={AppRoutesV2} />;
}

export default App;
