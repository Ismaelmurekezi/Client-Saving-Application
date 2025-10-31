import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader2, CheckCircle, XCircle, Clock } from "lucide-react";
import { toast } from "react-toastify";
import { authAPI } from "../services/api";
import { useAuthStore } from "../store/authStore";

const VerificationPending: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { deviceId } = useAuthStore();
  
  const [status, setStatus] = useState<string>("pendingVerification");
  const [isChecking, setIsChecking] = useState(false);
  const [message, setMessage] = useState("");
  
  // Get data from navigation state (from registration)
  const stateDeviceId = location.state?.deviceId;
  const email = location.state?.email;
  const currentDeviceId = deviceId || stateDeviceId;

  const checkVerificationStatus = async () => {
    if (!currentDeviceId) {
      toast.error("No device ID found. Please register again.");
      navigate("/register");
      return;
    }

    setIsChecking(true);
    
    try {
      const response = await authAPI.getVerificationStatus(currentDeviceId);
      const { verified, message: responseMessage, status: deviceStatus } = response.data;
      
      setStatus(deviceStatus);
      setMessage(responseMessage);
      
      if (verified) {
        toast.success("Device verified! You can now log in.");
        navigate("/login");
      } else {
        toast.info(responseMessage);
      }
    } catch (error: any) {
      console.error("Verification check error:", error);
      const errorMessage = error.response?.data?.message || "Failed to check verification status";
      toast.error(errorMessage);
      
      if (error.response?.status === 404) {
        // 404 is expected for newly registered devices that haven't been processed yet
        setStatus("pendingVerification");
        setMessage("Device verification is pending. Please wait for admin approval.");
      }
    } finally {
      setIsChecking(false);
    }
  };

  // Set initial message for new registrations
  useEffect(() => {
    if (currentDeviceId && !message) {
      setMessage("Device verification is pending. Please wait for admin approval.");
    }
  }, [currentDeviceId]);

  const getStatusIcon = () => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-12 h-12 text-green-500" />;
      case "rejected":
        return <XCircle className="w-12 h-12 text-red-500" />;
      default:
        return <Clock className="w-12 h-12 text-yellow-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "verified":
        return "text-green-600";
      case "rejected":
        return "text-red-600";
      default:
        return "text-yellow-600";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto flex justify-center">
            {getStatusIcon()}
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Device Verification Status
          </h2>
          
          {email && (
            <p className="mt-2 text-center text-sm text-gray-600">
              Account: <span className="font-medium">{email}</span>
            </p>
          )}
          
          <p className={`mt-2 text-center text-sm font-medium ${getStatusColor()}`}>
            {message || "Checking verification status..."}
          </p>

          {status === "rejected" && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 text-sm">
                Your device verification was rejected. Please contact support or try registering with a different device.
              </p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <button
            onClick={checkVerificationStatus}
            disabled={isChecking || !currentDeviceId}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isChecking ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Checking Status...
              </>
            ) : (
              "Check Verification Status"
            )}
          </button>

          <div className="text-center space-y-2">
            <button
              onClick={() => navigate("/login")}
              className="text-teal-600 hover:text-teal-500 font-medium"
            >
              Back to Login
            </button>
            <br />
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-blue-800 text-sm">
            <strong>Note:</strong> Device verification is handled by our admin team. 
            Once approved, you'll be able to access your savings account. 
            This process may take a few minutes to several hours.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationPending;
