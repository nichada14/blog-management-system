import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthForm from "../components/AuthForm";
import type { LoginPayload, RegisterPayload } from "../types/auth";


export default function RegisterLogin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Call API to login user with email and password
  const handleLogin = async (data: LoginPayload) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const res = await axios.post("/api/auth/login", data);
      localStorage.setItem("token", res.data.token); // Save JWT token for auth
      navigate("/blogs/list"); // Redirect to blogs page after login
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Call API to register user with username, email and password
  const handleRegister = async (data: RegisterPayload) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      await axios.post("/api/auth/register", data);
      // Auto-login after successful register
      await handleLogin({ email: data.email, password: data.password });
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Registration failed");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <AuthForm onLogin={handleLogin} onRegister={handleRegister} isLoading={isLoading} errorMessage={errorMessage} />
    </div>
  );
}
