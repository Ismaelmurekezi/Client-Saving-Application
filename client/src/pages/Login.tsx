import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";



const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");




  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 absolute left-10 top-6">
          <h1 className="text-2xl font-bold text-teal-700">USeve</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center text-teal-700 mb-6">
            WELCOME BACK
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-500" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Remember me</span>
              </label>
              <a href="#" className="text-sm text-gray-700 hover:text-teal-700">
                Forget password
              </a>
            </div>

            <button
            
              className="w-full bg-teal-800 text-white py-3 rounded-md font-medium hover:bg-teal-900 transition disabled:opacity-50"
            >
            LOGIN
            </button>

            <p className="text-center text-sm text-gray-600">
              Don't have an account ?{" "}
              <a href="#" className="text-teal-700 font-medium">
                Create account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
