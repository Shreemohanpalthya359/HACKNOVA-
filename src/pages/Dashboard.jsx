import Card from "../components/Card";
import Chart from "../components/Chart";

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen">

      <h1 className="text-2xl font-bold mb-6 text-black dark:text-white">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card title="Total Sales" value="$25,000" />
        <Card title="Orders" value="1200" />
        <Card title="Customers" value="850" />
      </div>

      <Chart />
    </div>
  );
};

export default Dashboard;