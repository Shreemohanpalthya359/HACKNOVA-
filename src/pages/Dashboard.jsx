import React, { useEffect, useState } from "react";
import {
  getSales,
  getRevenue,
  getTopProducts,
  getCustomers,
} from "../services/api";

import Loader from "../components/Loader";

import { Line, Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";

const Dashboard = () => {
  const [sales, setSales] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);

      const salesData = await getSales();
      const revenueData = await getRevenue();
      const productData = await getTopProducts();
      const customerData = await getCustomers();

      setSales(salesData);
      setRevenue(revenueData);
      setProducts(productData);
      setCustomers(customerData);

      setLoading(false);
    };

    fetchAllData();
  }, []);

  if (loading) return <Loader />;

  // 📊 Sales Chart
  const salesChart = {
    labels: sales.map((s) => s.date),
    datasets: [
      {
        label: "Sales",
        data: sales.map((s) => s.total_sales),
      },
    ],
  };

  // 💰 Revenue Chart
  const revenueChart = {
    labels: revenue.map((r) => r.date),
    datasets: [
      {
        label: "Revenue",
        data: revenue.map((r) => r.total_revenue),
      },
    ],
  };

  // 🏆 Top Products
  const productChart = {
    labels: products.map((p) => p.product_name),
    datasets: [
      {
        label: "Top Products",
        data: products.map((p) => p.sales),
      },
    ],
  };

  // 👥 Customers
  const customerChart = {
    labels: customers.map((c) => c.customer_name),
    datasets: [
      {
        label: "Customers",
        data: customers.map((c) => c.orders),
      },
    ],
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <div className="bg-white p-4 shadow rounded-xl">
        <h2 className="font-bold mb-2">Sales</h2>
        <Line data={salesChart} />
      </div>

      <div className="bg-white p-4 shadow rounded-xl">
        <h2 className="font-bold mb-2">Revenue</h2>
        <Line data={revenueChart} />
      </div>

      <div className="bg-white p-4 shadow rounded-xl">
        <h2 className="font-bold mb-2">Top Products</h2>
        <Bar data={productChart} />
      </div>

      <div className="bg-white p-4 shadow rounded-xl">
        <h2 className="font-bold mb-2">Customers</h2>
        <Pie data={customerChart} />
      </div>

    </div>
  );
};

export default Dashboard;