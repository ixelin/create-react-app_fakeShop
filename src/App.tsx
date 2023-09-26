import "./App.css";
import Header from "./components/header";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "./pages/Product";
import ProductsPage from "./pages/Products";
import ProfilePage from "./pages/Profile";
import LoginPage from "./pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NotFoundPage from "./pages/NotFoundPage";
import { useEffect } from "react";
import { getUserCredentials } from "./helpers/getUser";
import Cookies from "universal-cookie"
const queryClient = new QueryClient();
export const cookies = new Cookies()
function App() {
  useEffect(() => {
    getUserCredentials()
	}, []);
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

export default App;
