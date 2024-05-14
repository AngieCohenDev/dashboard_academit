import DashboardStatsGrid from "./DashboardStatsGrid";
import TransactionChart from "./TransactionChart";

export default function Dashboard() {
  return (
    <div className="flexflex-col gap-4">
      <DashboardStatsGrid />
      <TransactionChart />
    </div>
  );
}
