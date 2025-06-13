// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, isAdmin }) => {
//   const user = JSON.parse(localStorage.getItem("user")); // User data get karo
//   const token = localStorage.getItem("token"); // Token get karo

//   // Agar user logged in nahi hai to login page pe bhejo
//   if (!token || !user) {
//     return <Navigate to="/login" />;
//   }

//   // Agar isAdmin prop true hai, to sirf admin users ko allow karo
//   if (isAdmin && user.role !== "admin") {
//      return <Navigate to="/login" />;
//   }

//   return children; // Agar sab kuch theek hai to component render hoga
// };

// export default ProtectedRoute;



import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // Redirect to login if user is not authenticated
  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  // Redirect to login if user is not an admin
  if (user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
