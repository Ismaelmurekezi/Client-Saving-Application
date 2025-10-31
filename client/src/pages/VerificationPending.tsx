import React from "react";
import { useNavigate } from "react-router-dom";



const VerificationPending: React.FC = () => {
  const navigate = useNavigate();





  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 text-yellow-400">
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Device Verification Pending
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Your device is currently being verified by our admin team. Please
            wait for approval.
          </p>

          {status === "rejected" && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800">
                Your device verification was rejected. Please contact support.
              </p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <button

            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
           "Check Verification Status
          </button>

          <div className="text-center">
            <button
              onClick={() => navigate("/login")}
              className="text-indigo-600 hover:text-indigo-500"
            >
              Back to Login
            </button>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-blue-800 text-sm">
            <strong>Note:</strong> Device verification is handled by our
            separate Admin application. Once approved, you'll be able to access
            your savings account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationPending;
