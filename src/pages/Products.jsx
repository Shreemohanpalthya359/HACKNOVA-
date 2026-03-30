import { useState } from "react";

const Products = () => {
  const [search, setSearch] = useState("");

  const products = [
    { id: 1, name: "Laptop", price: "$1000", stock: 20 },
    { id: 2, name: "Mobile", price: "$500", stock: 10 },
    { id: 3, name: "Headphones", price: "$150", stock: 50 },
  ];

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen">

      <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">
        Products
      </h1>

      <input
        type="text"
        placeholder="Search products..."
        className="mb-4 p-2 border rounded w-full md:w-1/3"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-200 dark:bg-gray-600">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-t dark:border-gray-600">
                <td className="p-3">{p.name}</td>
                <td className="p-3">{p.price}</td>
                <td className="p-3">{p.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;