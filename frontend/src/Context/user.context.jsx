import { createContext, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export const UserContext = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const backend_url = import.meta.env.VITE_BACKEND;

  const signup = async (name, email, password, navigate) => {
    setLoading(true);
    try {
      if (!name || !email || !password) {
        throw new Error("All fields are required");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Invalid email format");
      }

      const { data } = await axios.post(
        `${backend_url}/auth/signup`,
        { name, email, password },
        { withCredentials: true }
      );

      if (data.success) {
        navigate("/");
        toast.info("Signup Successful");
      } else {
        toast.info(data.msg || "Signup failed");
      }
    } catch (error) {
      if (error.response?.data?.msg) {
        toast.info(error.response.data.msg);
      } else {
        toast.info(error.message || "An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password, navigate) => {
    setLoading(true);
    try {
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Invalid email format");
      }

      const { data } = await axios.post(
        `${backend_url}/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      if (data.success) {
        toast.info("Login Successful");
        navigate && navigate("/");
      } else {
        toast.info(data.msg || "Login failed");
      }
    } catch (error) {
      if (error.response?.data?.msg) {
        toast.info(error.response.data.msg);
      } else {
        toast.info(error.message || "An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const checkAuth = async (navigate) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backend_url}/auth/check`, {
        withCredentials: true,
      });

      if (data.success && data.user) {
        setUser(data.user);
        navigate && navigate("/");
      } else {
        navigate && navigate("/register");
        // toast.info(data.msg || "Unauthorized");
      }
    } catch (error) {
      navigate && navigate("/register");
      if (error.response?.data?.msg) {
        // toast.info(error.response.data.msg);
      } else {
        // toast.info(error.message || "An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async (navigate) => {
    try {
      const { data } = await axios.get(`${backend_url}/auth/logout`, {
        withCredentials: true,
      });

      if (data.success) {
        setUser(null);
        navigate("/register");
        toast.info("Logged out successfully");
      } else {
        toast.info(data.msg || "Logout failed");
      }
    } catch (error) {
      if (error.response?.data?.msg) {
        toast.info(error.response.data.msg);
      } else {
        toast.info(error.message || "Logout failed");
      }
    }
  };

  const reviewCode = async (code, setReview, setreviewLoad) => {
    setreviewLoad(true);
    try {
      if (!code) {
        toast.info("Code is required to review");
        return;
      }

      const { data } = await axios.post(
        `${backend_url}/ai/review`,
        { code },
        { withCredentials: true }
      );
      setReview(data.review);
    } catch (error) {
      if (error.response?.data?.msg) {
        toast.info(error.response.data.msg);
      } else {
        toast.info(error.message || "Unable to review the code!");
      }
    } finally {
      setreviewLoad(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        setUser,
        setLoading,
        signup,
        login,
        logout,
        reviewCode,
        checkAuth,
        ToastContainer,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
