import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const { signInWithEmail, signInWithGoogle } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmail(email, password);
      toast.success("Login successful!");
      navigate("/"); // redirect to home or dashboard
    } catch (err) {
      setError(err.message);
      toast.error("Invalid email or password.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      setError(err.message);
      toast.error("Invalid email or password.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-orange-50">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-3xl font-bold text-orange-600">
          Login to Recipe Book
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && <p className="text-sm text-red-500">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full rounded border border-orange-300 px-4 py-2 text-gray-600 outline-none placeholder:text-gray-400 focus:border-orange-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="w-full rounded border border-orange-300 px-4 py-2 text-gray-600 outline-none placeholder:text-gray-400 focus:border-orange-600"
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

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-orange-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
