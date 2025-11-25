import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import AuthServices from "../services/authServices";

export default function ProtectedRoute({ children }) {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await AuthServices.verifyUser();
        console.log("Verification response:", response);
        setAuth(response.data.success);
      } catch (err) {
        setAuth(false);
      }
    };
    verifyAuth();
  }, []);

  // ⏳ While checking, don't redirect yet
  if (auth === null) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700">
        <p>Checking Authentication...</p>
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" alt="" />
      </div>
    )
  }

  // ❌ Not logged in
  if (!auth) {
    return <Navigate to="/" replace />;
  }

  // ✅ Logged in
  return children;
}
