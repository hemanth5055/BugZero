import { createContext, useState } from "react";
import axios from "axios";

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

      const { data } = await axios.post(
        `${backend_url}/auth/signup`,
        { name, email, password },
        { withCredentials: true }
      );

      if (data.success) {
        console.log("Signup Successful");
        navigate && navigate("/");
      } else {
        console.log(data.msg || "Signup failed");
      }
    } catch (error) {
      if (error.response?.data?.msg) {
        console.log(error.response.data.msg);
      } else {
        console.log(error.message || "An unexpected error occurred");
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

      const { data } = await axios.post(
        `${backend_url}/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      if (data.success) {
        console.log("Login Successful");
        navigate && navigate("/");
      } else {
        console.log(data.msg || "Login failed");
      }
    } catch (error) {
      if (error.response?.data?.msg) {
        console.log(error.response.data.msg);
      } else {
        console.log(error.message || "An unexpected error occurred");
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
        console.log(data.msg || "Unauthorized");
      }
    } catch (error) {
      navigate && navigate("/register");
      if (error.response?.data?.msg) {
        console.log(error.response.data.msg);
      } else {
        console.log(error.message || "An unexpected error occurred");
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
        setUser(null); // Clear user context
        navigate("/register"); // Redirect to register page
      } else {
        console.log(data.msg || "Logout failed");
      }
    } catch (error) {
      if (error.response?.data?.msg) {
        console.log(error.response.data.msg); // Backend error message
      } else {
        console.log(error.message || "Logout failed");
      }
    }
  };

  const reviewCode = async (code, setReview, setreviewLoad) => {
    setreviewLoad(true);
    try {
      if (!code) {
        console.log("Code is need to review");
      }
      const { data } = await axios.post(
        `${backend_url}/ai/review`,
        { code },
        { withCredentials: true }
      );
      setReview(data.review);
    } catch (error) {
      if (error.response?.data?.msg) {
        console.log(error.response.data.msg); // Backend error message
      } else {
        console.log(error.message || "Unable to review the code !");
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
