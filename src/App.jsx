import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/sidebar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Customers from "./pages/Customers";

function App() {
  const [dark, setDark] = useState(false);

  return (
    <BrowserRouter>
      <div className={dark ? "dark" : ""}>
        <div className="flex">

          <Sidebar toggleDark={() => setDark(!dark)} />

          <div className="ml-64 w-full bg-gray-100 dark:bg-gray-800 min-h-screen transition">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
            </Routes>
          </div>

        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;