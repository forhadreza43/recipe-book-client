import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password);
      await updateUserProfile({ displayName: name });
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-orange-50">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-3xl font-bold text-orange-600">
          Register
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          {error && <p className="text-sm text-red-500">{error}</p>}
          <input
            type="text"
            placeholder="Full Name"
            required
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full rounded bg-orange-500 py-2 text-white hover:bg-orange-600">
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
