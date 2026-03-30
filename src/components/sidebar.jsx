import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ toggleDark }) => {
  const location = useLocation();

  const linkStyle = (path) =>
    `p-2 rounded ${
      location.pathname === path
        ? "bg-gray-700"
        : "hover:bg-gray-800"
    }`;

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5 fixed flex flex-col justify-between">
      
      <div>
        <h1 className="text-xl font-bold mb-8">Amazon Analytics</h1>

        <nav className="flex flex-col space-y-2">
          <Link to="/" className={linkStyle("/")}>Dashboard</Link>
          <Link to="/products" className={linkStyle("/products")}>Products</Link>
          <Link to="/customers" className={linkStyle("/customers")}>Customers</Link>
        </nav>
      </div>

      <button
        onClick={toggleDark}
        className="bg-gray-700 px-3 py-2 rounded hover:bg-gray-600"
      >
        🌙 Toggle Dark Mode
      </button>

    </div>
  );
};

export default Sidebar;