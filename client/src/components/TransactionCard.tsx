import { useState } from 'react'

export default function TransactionCard() {
     const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('withdraw');
  return (
    
            <div className="bg-white w-[500px] h-72  rounded-lg shadow-sm border border-gray-200 p-6 mb-10">
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

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Amount
                </label>
                <input
                  type="text"
                  placeholder="Enter Amount"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />
                <button className="w-full bg-blue-900 text-white py-2.5 rounded-lg font-medium hover:bg-blue-800 transition-colors">
                  {activeTab === 'deposit' ? 'Deposit' : 'Withdraw'}
                </button>
              </div>
            </div>
    );
}
