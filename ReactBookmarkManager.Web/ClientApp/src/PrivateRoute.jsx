import { useAuthContext } from "./AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const PrivateRoute=({children})=>{
    const {user} = useAuthContext();
    console.log(user);
    return user?children: <Navigate to='/login' replace/>
}

export default PrivateRoute;