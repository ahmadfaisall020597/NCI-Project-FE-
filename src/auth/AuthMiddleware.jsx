import { Navigate } from "react-router-dom";

function isAuthenticated () {
    const token = localStorage.getItem('authorization');
    return !!token;
}

const AuthMiddleware = ({ component: Component, location }) => {
    if (isAuthenticated()) {
      return <Component />;
    } else {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  };
  
  export default AuthMiddleware;