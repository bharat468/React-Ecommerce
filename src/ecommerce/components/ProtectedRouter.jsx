// import { Navigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthProvider";
// import { useEffect, useState } from "react";

// function ProtectedRoute({ children }) {
//   const { isUserLoggedIn } = useAuth();
//   const [isLoggedIn, setIsLoggedIn] = useState(null)

//   useEffect(() => {
//     chekUserLogin()
//   }, [])
//   async function chekUserLogin() {
//     const temp = await isUserLoggedIn()
//     setIsLoggedIn(temp)
//   }

//   if (isLoggedIn === null) {
//     return <div>Loading...</div>
//   }

//   if (isLoggedIn === false) {
//     return <Navigate to="/login" />
//   }

//   return children
// }

// export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();

  console.log("isLoggedIn", isLoggedIn); // Logging as false, even after logging in

  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
