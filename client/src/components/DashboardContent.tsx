import { DollarSign, TrendingUp } from "lucide-react";
import StatsCard from "./StatsCard";
import TransactionCard from "./TransactionCard";
import TransactionTable from "./TransactionTable";

export default function DashboardContent() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatsCard
            title="Current Balance"
            value="$12,450"
            icon={DollarSign}
            color="green"
          />
          <StatsCard
            title="Total Transactions"
            value="156"
            icon={TrendingUp}
            color="blue"
          />
        </div>

        {/* Transaction Card - Right Side */}
        <div className="lg:col-span-1">
          <TransactionCard />
        </div>
      </div>

      {/* Transaction Table */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Transactions
        </h3>
        <TransactionTable />
      </div>
    </div>
  );
}
