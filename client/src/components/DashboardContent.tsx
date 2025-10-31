import { useEffect, useState } from "react";
import { DollarSign, TrendingUp } from "lucide-react";
import StatsCard from "./StatsCard";
import TransactionCard from "./TransactionCard";
import TransactionTable from "./TransactionTable";
import { savingsAPI } from "../services/api";
import { useAuthStore } from "../store/authStore";

export default function DashboardContent() {
  const { user } = useAuthStore();
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await savingsAPI.getTransactions();
      setTransactions(response.data.transactions || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatsCard
            title="Current Balance"
            value={`$${user?.balance?.toLocaleString() || '0'}`}
            icon={DollarSign}
            color="green"
          />
          <StatsCard
            title="Total Transactions"
            value={transactions.length.toString()}
            icon={TrendingUp}
            color="blue"
          />
        </div>

        <div className="lg:col-span-1">
          <TransactionCard />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Transactions
        </h3>
        <TransactionTable transactions={transactions} isLoading={isLoading} onRefresh={fetchTransactions} />
      </div>
    </div>
  );
}
