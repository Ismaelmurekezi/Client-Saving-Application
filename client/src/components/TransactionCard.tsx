import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { savingsAPI } from '../services/api';
import { useAuthStore } from '../store/authStore';

export default function TransactionCard() {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { updateBalance } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const numAmount = parseFloat(amount);
    
    if (!amount || numAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = activeTab === 'deposit' 
        ? await savingsAPI.deposit({ amount: numAmount })
        : await savingsAPI.withdraw({ amount: numAmount });
      
      const { balance, transaction } = response.data;
      
      // Update balance in store
      updateBalance(balance);
      
      toast.success(`${activeTab === 'deposit' ? 'Deposit' : 'Withdrawal'} successful!`);
      
      // Clear form
      setAmount('');
      
    } catch (error: any) {
      console.error(`${activeTab} error:`, error);
      const message = error.response?.data?.message || `${activeTab} failed. Please try again.`;
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white w-full max-w-md rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('deposit')}
          className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-colors ${
            activeTab === 'deposit'
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          Deposit
        </button>
        <button
          onClick={() => setActiveTab('withdraw')}
          className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-colors ${
            activeTab === 'withdraw'
              ? 'bg-red-500 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          Withdraw
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Amount
        </label>
        <input
          type="number"
          step="0.01"
          min="0.01"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          required
        />
        <button 
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-900 text-white py-2.5 rounded-lg font-medium hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            activeTab === 'deposit' ? 'Deposit' : 'Withdraw'
          )}
        </button>
      </form>
    </div>
  );
}
