import { ChevronLeft, ChevronRight, Filter, Search } from "lucide-react";

export default function TransactionTable() {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4">
        <div className="flex items-center justify-between my-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">DATE</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">TYPE</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">AMOUNT</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">BALANCE AFTER</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-700">2024-01-15</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Deposit
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-green-600 font-medium">+$500</td>
                <td className="px-6 py-4 text-sm text-gray-700">$12,450</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Completed
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-700">2024-01-14</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Withdraw
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-red-600 font-medium">-$200</td>
                <td className="px-6 py-4 text-sm text-gray-700">$11,950</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Completed
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-700">2024-01-13</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Deposit
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-green-600 font-medium">+$1,000</td>
                <td className="px-6 py-4 text-sm text-gray-700">$12,150</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Completed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-700">
            Showing 1-3 of 156 results
          </p>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800">
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded bg-teal-600 text-white text-sm">1</button>
              <button className="w-8 h-8 rounded hover:bg-gray-100 text-sm">2</button>
              <button className="w-8 h-8 rounded hover:bg-gray-100 text-sm">3</button>
            </div>
            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800">
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}