import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between">
      <h1 className="font-bold text-lg">Amazon Analytics</h1>

      <div className="space-x-6">
        <Link to="/">Dashboard</Link>
        <Link to="/products">Products</Link>
        <Link to="/customers">Customers</Link>
      </div>
    </nav>
  );
};

export default Navbar;