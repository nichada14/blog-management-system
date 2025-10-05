import { useState } from "react";
import type { AuthFormProps } from "../types/props";

export default function AuthForm({
  onLogin,
  onRegister,
  isLoading,
  errorMessage,
}: AuthFormProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      onLogin({ email: form.email, password: form.password });
    } else {
      onRegister({
        username: form.username,
        email: form.email,
        password: form.password,
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="w-[90%] max-w-[400px] px-6 py-8 bg-white shadow-md border border-black rounded-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">
          {mode === "login" ? "Login" : "Register"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold mb-1 text-black"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Your username"
                value={form.username}
                onChange={handleChange}
                required
                minLength={4}
                maxLength={20}
                className="w-full px-3 py-2 rounded-md border border-black focus:outline-none focus:ring-1 focus:ring-[#FEC709] text-sm text-black"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold mb-1 text-black"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-md border border-black focus:outline-none focus:ring-1 focus:ring-[#FEC709] text-sm text-black"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-1 text-black"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              required
              minLength={8}
              className="w-full px-3 py-2 rounded-md border border-black focus:outline-none focus:ring-1 focus:ring-[#FEC709] text-sm text-black"
            />
          </div>

          {errorMessage && (
            <p className="text-center text-red-500 font-semibold text-sm">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#FEC709] hover:bg-yellow-600 text-black font-semibold py-2 rounded-md transition disabled:opacity-50 text-sm cursor-pointer"
          >
            {isLoading
              ? "Please wait..."
              : mode === "login"
              ? "Login"
              : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-black">
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("register")}
                className="underline font-semibold hover:text-yellow-600 transition cursor-pointer"
              >
                Register here
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="underline font-semibold hover:text-yellow-600 transition cursor-pointer"
              >
                Login here
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
