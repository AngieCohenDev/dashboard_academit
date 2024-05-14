import BuyerProfileChart from "./BuyerProfileChart";
import DashboardStatsGrid from "./DashboardStatsGrid";
import TransactionChart from "./TransactionChart";

export default function Dashboard() {
  return (
    <div className="flexflex-col gap-4">
      <DashboardStatsGrid />
      <div className="flex flex-row gap-4 w-full mt-2">
        <TransactionChart />
        <BuyerProfileChart />
      </div>
    </div>
  );
}
