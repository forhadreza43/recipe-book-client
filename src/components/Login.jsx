import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { useLocation } from "react-router";

export default function Login() {
  const { signInWithEmail, signInWithGoogle } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state || "/";
  // console.log(location, redirectPath);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmail(email, password);
      toast.success("Login successful!");
      navigate(redirectPath);
    } catch (err) {
      setError(err.message);
      toast.error("Invalid email or password.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      toast.success("Login successful!");
      navigate(redirectPath);
    } catch (err) {
      setError(err.message);
      toast.error("Invalid email or password.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-xl border border-orange-300 bg-white p-8 shadow-md dark:bg-gray-800">
        <h2 className="mb-6 text-center text-3xl font-bold text-orange-600">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && <p className="text-sm text-red-500">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            required
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="mb-1 flex justify-between">
            <div className="mb-1"></div>
            <Link className="mb-1 text-right text-sm text-orange-600">
              Forget password
            </Link>
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="absolute right-0 top-0 mr-2 translate-y-2 p-1 text-sm"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <LuEye size={18} className="text-gray-700" />
              ) : (
                <LuEyeClosed size={18} className="text-gray-700" />
              )}
            </button>
          </div>

          <button className="w-full cursor-pointer rounded bg-orange-500 py-2 text-white hover:bg-orange-600">
            Login
          </button>
        </form>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded bg-orange-50 py-2 text-gray-600 hover:bg-orange-100"
        >
          <FcGoogle />
          Continue with Google
        </button>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-200">
          Don’t have an account?{" "}
          <Link to="/register" className="text-orange-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
