import BuyerProfilePieChart from "../components/BuyerProfilePieChart";
import DashboardStatsGrid from "../components/DashboardStatsGrid";
import PopularProducts from "../components/PopularProducts";
import RecentOrders from "../components/RecentOrders";
import TransactionChart from "../components/TransactionChart";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <DashboardStatsGrid />
      <div className="flex flex-row gap-4 w-full">
        <TransactionChart />
        <BuyerProfilePieChart />
      </div>
      <div className="flex flex-row gap-4 w-full">
        <RecentOrders />
        <PopularProducts />
      </div>
    </div>
  );
}
