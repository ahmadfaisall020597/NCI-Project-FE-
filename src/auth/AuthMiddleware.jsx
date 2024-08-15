import { Navigate } from "react-router-dom";

function isAuthenticated () {
    const token = localStorage.getItem('authorization');
    console.log('token local storage : ', token);
    return !!token;
}

const AuthMiddleware = ({ component: Component, location }) => {
    console.log('component : ', Component);
    if (isAuthenticated()) {
      return <Component />;
    } else {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  };
  
  export default AuthMiddleware;