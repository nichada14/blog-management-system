import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthForm from "../components/AuthForm";
import type { LoginPayload, RegisterPayload } from "../types/auth";

// Decode JWT token
function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

export default function RegisterLogin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (data: LoginPayload) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      // Login request
      const res = await axios.post("/api/auth/login", data);
      const token = res.data.token;
      localStorage.setItem("token", token);

      // Decode token to extract userId and username
      const decoded = parseJwt(token);
      console.log("Decoded JWT:", decoded); 

      if (decoded && decoded.userId) {
        localStorage.setItem("userId", String(decoded.userId));
        
        if (decoded.username) {
          localStorage.setItem("username", String(decoded.username));
        }
      } else {
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
      }

      navigate("/blogs/list");
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: RegisterPayload) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      // Register user
      await axios.post("/api/auth/register", data);

      // Auto login after register
      await handleLogin({ email: data.email, password: data.password });
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Registration failed");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <AuthForm
        onLogin={handleLogin}
        onRegister={handleRegister}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
    </div>
  );
}
