import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/shared/Layout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="product" element={<Products />} />
        </Route>
        <Route path="login" element={<div>Este es el login</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
