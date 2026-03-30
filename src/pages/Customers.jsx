import { useState } from "react";

const Customers = () => {
  const [search, setSearch] = useState("");

  const customers = [
    { id: 1, name: "Alice", orders: 5 },
    { id: 2, name: "Bob", orders: 3 },
    { id: 3, name: "Charlie", orders: 7 },
  ];

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen">

      <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">
        Customers
      </h1>

      <input
        type="text"
        placeholder="Search customers..."
        className="mb-4 p-2 border rounded w-full md:w-1/3"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-200 dark:bg-gray-600">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Orders</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-t dark:border-gray-600">
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.orders}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;