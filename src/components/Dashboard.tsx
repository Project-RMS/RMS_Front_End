
import { DollarSign, Users, ShoppingBag, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: "Today's Revenue",
      value: "$2,456",
      icon: DollarSign,
      trend: "+14.6%",
      color: "bg-blue-500",
    },
    {
      title: "Active Orders",
      value: "45",
      icon: ShoppingBag,
      trend: "+32.8%",
      color: "bg-green-500",
    },
    {
      title: "Total Customers",
      value: "1,234",
      icon: Users,
      trend: "+28.4%",
      color: "bg-purple-500",
    },
    {
      title: "Avg. Order Value",
      value: "$54.32",
      icon: TrendingUp,
      trend: "+8.2%",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            Export
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Add Order
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                <p className="text-sm text-green-600 mt-2">{stat.trend} from last month</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((order) => (
              <div key={order} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Order #{order}234</p>
                  <p className="text-sm text-gray-600">Table 12 • 3 items</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  Completed
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Popular Items</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                  <div>
                    <p className="font-medium">Chicken Burger</p>
                    <p className="text-sm text-gray-600">$12.99</p>
                  </div>
                </div>
                <span className="text-sm text-gray-600">234 orders</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;